import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Recipe } from '../types/recipe';
import { User } from '../types/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})

export class RecipeService {

  constructor(private http: HttpClient) {
    this.http.get(`${this.url}`).subscribe( s => {
      this.recipeSubject.next(s as Recipe[]);
    })
   }

  private url: string = environment.apiUrl+"/recipe"
  private readonly recipeSubject = new BehaviorSubject<Recipe[]>([]);
  readonly recipe$ = this.recipeSubject.asObservable();


// GETTERS AND SETTERS

  getAllRecipes(): Observable<Recipe[]> {
    return this.http.get(this.url, httpOptions).pipe(map(response => {
      return response as Recipe[];
    }))
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.http.get(this.url+`/${id}`, httpOptions).pipe(map(response => {
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
      // TODO Add route to freshly created recipe
    })
  }

  // TODO Add Update recipe function

  deleteRecipe(recipeId: number): void {
    this.http.delete(this.url+`/${recipeId}`, httpOptions).subscribe(response => {
      this.recipeSubject.next(this.recipes.filter(recipe => recipe.id !== recipeId));
    });
  }

}
