import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Recipe } from '../types/recipe';
import { User } from '../types/user';
import { NutrientEntity } from '../types/NutrientEntity';
import { Nutrient } from '../types/nutrient';
import { Ingredient } from '../types/ingredient'
import { Instruction } from '../types/instruction'
import { Category } from '../types/category'
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  constructor(
    private http: HttpClient,
    public router: Router) {
    this.http.get(`${this.url}`).subscribe(s => {
      this.recipeSubject.next(s as Recipe[]);
    })
  }

  private url: string = environment.apiUrl + "/api/v2/recipe"
  private readonly recipeSubject = new BehaviorSubject<Recipe[]>([]);
  readonly recipe$ = this.recipeSubject.asObservable();


  // GETTERS AND SETTERS

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get(this.url, httpOptions).pipe(map(response => {
      return response as Recipe[];
    }))
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.http.get(this.url + `/${id}`, httpOptions).pipe(map(response => {
      return response as Recipe;
    }))
  }

  get recipes(): Recipe[] {
    return this.recipeSubject.getValue();
  }

  set recipes(recipes: Recipe[]) {
    this.recipeSubject.next(recipes);
  }

  // CRUD FUNCTIONS BELOW
  addRecipe(recipe: Recipe): void {
    this.http.post(this.url, recipe, httpOptions).subscribe((response: Recipe) => {
      this.recipes = [
        ...this.recipes, response
      ]
      this.router.navigate(['recipe/'+response.id]); 
    })
  }

  // TODO flesh out update function to include response
  updateRecipe(recipe: Recipe): void {
    this.http.put(this.url, recipe, httpOptions).subscribe((response: Recipe) => {
      this.recipes = [
        ...this.recipes.filter(replacedRecipe => replacedRecipe.id !== recipe.id), response
      ]
    })
  }

  deleteRecipe(recipeId: number): void {
    this.http.delete(this.url + `/${recipeId}`, httpOptions).subscribe(response => {
      this.recipeSubject.next(this.recipes.filter(recipe => recipe.id !== recipeId));
    });
  }

  getNutritionalInfo(recipeId: number): Observable<NutrientEntity[]> {
    // TODO : This whill likely be the finished url
    // for now, i'm hardcoding a recipe ID in to get mocked data
    // return this.http.get(`${this.url}/nutrients/${recipeId}`,httpOptions);

    //should be returning an array of NutrientEntities, NutrientEntity[]
    return this.http.get(`${this.url}/nutrients/${recipeId}`, httpOptions).pipe(map(res => {
      return res as NutrientEntity[];
    }));
  }

  filterNutrition(ingredients: NutrientEntity[]): Nutrient[] {
    let nutrientFocus = ['calories', 'fat', 'Carbohydrates', 'sodium', 'sugar', 'protein', 'fiber']
    let combinedNutrients2: Nutrient[] = [];
    let testNut: Nutrient[] = [];

    ingredients.forEach(ing => {
      let temp = ing.nutrients.filter(nutrient => nutrientFocus.includes(nutrient.name.toLowerCase()));
      combinedNutrients2.push(...temp)
    })

    combinedNutrients2 = combinedNutrients2.reduce((acc, item) => {
      if (!acc.find(search => search.name === item.name)) {
        //if NOT found, pushes
        acc.push(item);
      }
      else {
        //if it IS found
        const nut = acc.find(search => search.name === item.name)
        nut.amount = nut.amount + item.amount;
        acc = [
          ...acc.filter(i => i.name !== item.name), nut
        ]
      }
      return acc;
    }, [])
    return combinedNutrients2;

  }

  findRelatedRecipes(recipe: Recipe){
    
    let recipesUrl = this.url + "?category=";
    recipe.categories.forEach(cat => recipesUrl += cat.id + ",")
    
    return this.http.get(recipesUrl.slice(0, -1), httpOptions).pipe(
      filter((r: Recipe) => r.id === recipe.id)
      ,map(response => {
        return response as Recipe[];
      })
    )
  }

  findRecipesByCategoryOrIngredientId(httpParams: HttpParams): Observable<Recipe[]> {
    return this.http.get(this.url, 
                        {params: httpParams, 
                         headers: new HttpHeaders({ 'Content-Type': 'application/json' })
                        }).pipe(map(response => {
      return response as Recipe[];
    }));
  }

  mapToRecipeObject(object: any){
    let recipe = {} as Recipe;
    recipe.instructions = []
    recipe.categories = []
    recipe.ingredients = []
    recipe.photoUrl = object.photoUrl
    recipe.title = object.title
    recipe.cookTime = this.parseTime(object.cookTime)
    recipe.prepTime = this.parseTime(object.prepTime)
    object.instructions.forEach((i) => {
      recipe.instructions.push({content: i.schema.text, instructionOrder: i.order})
    })
    object.categories.forEach((c) => {
      recipe.categories.push({name: c.name})
    })
    object.ingredients.forEach((i) => {
      recipe.ingredients.push({content: i.content, quantity: i.quantity, measure: i.measure})
    })
    return recipe
  }

  parseTime(isoString: string){
    let time = isoString.split("T").pop()
    switch (time.slice(-1)){
      case "M":
        return +time.split("M")[0]
      case "H":
        return ((+time.split("H")[0])/60)
    }
  }
  findRecipesByUser(httpParams: HttpParams): Observable<Recipe[]> {
    return this.http.get(this.url, 
                        {params: httpParams, 
                        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
                        }).pipe(map(response => {
      return response as Recipe[];
    }));
  }

}
