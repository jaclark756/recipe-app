import { Component, Input, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { RECIPES } from 'src/app/helpers/sample-data';
import { NUTRIENTS } from 'src/app/helpers/sample-data';
import { RecipeService } from 'src/app/services/recipe.service';
import { TokenService } from 'src/app/services/token.service';
import { Ingredient } from 'src/app/types/ingredient';
import { Instruction } from 'src/app/types/instruction';
import { Nutrient } from 'src/app/types/nutrient';
import { NutrientEntity } from 'src/app/types/NutrientEntity';
import { Recipe } from 'src/app/types/recipe';
import { CollectionDialogComponent } from 'src/app/shared/components/collection-dialog/collection-dialog.component';
import { InputRecipeComponent } from '../input-recipe/input-recipe.component';
import { RecipeUpdateNote } from 'src/app/types/recipeUpdateNote';
import { Category } from 'src/app/types/category';


@Component({
  selector: 'app-view-recipes',
  templateUrl: './view-recipes.component.html',
  styleUrls: ['./view-recipes.component.scss'],
})
export class ViewRecipesComponent implements OnInit {
  public recipe: Recipe;
  public ingredients: Ingredient[];
  public instructions: Instruction[];
  public notes: RecipeUpdateNote[] = [];
  public categories: Category[];
  public categoriesPresent: boolean = false;
  public isNotesNull: boolean = false;
  public relatedRecipes: any;
  sample_recipes = RECIPES;
  ingredientList = [
    'Asparagus',
    "Jordan's Latest eyeroll",
    "Jackie's Coolness",
    "Ryan's Tears",
    '1 Cup Sugar',
    'Cheezits',
    "Cale's 'u w0nt' quote",
    'Ravioli',
    'Crabgrass',
    'Beetles',
    '1/2 cup dumpster juice',
    'A human hand',
    'Fetta Cheese',
    'The J&J Covid Vaccine',
  ];

  instructionList = [
    '1. Preheat oven to 700 degrees Kelvin',
    '2. Turn on centrifuge at 400rpm',
    '3. Slam 3 Redbulls',
    '4. Celebrate with a Commit',
    '5. Mix all ingredients in a kiddie pool with 17 gallons of water',
    '6. Use paverbase tamper to mash everything into small chunks',
    '7. Simmer on stove for 20 min',
    '8. Let cool for 5 min off stove',
    '9. Serve with Parsely garnish',
  ];

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private dialog: MatDialog,
    private tokenService: TokenService
  ) {  }

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    this.route.paramMap.subscribe(param => {
      if (param.get('id')) {
        this.recipeService.getRecipe(+param.get('id')).subscribe(recipe => {
          this.recipe = recipe;
          this.relatedRecipes = this.recipeService.findRelatedRecipes(recipe);
          this.ingredients = recipe.ingredients;
          this.instructions = recipe.instructions;
          this.notes = recipe.notes;
          this.instructions.sort((a,b) => a.instructionOrder -b.instructionOrder);
          this.categories = recipe.categories;
          if(this.notes.length<1)
          {
            this.isNotesNull=true;
          }
          else
          {
            this.isNotesNull=false;
          }
          if(recipe.categories.length > 0) {
            this.categoriesPresent = true;
          } else {
            this.categoriesPresent == false;
          }
        })
      };
    })
  }

  editRecipeDialog() {
    const config = new MatDialogConfig();
    config.autoFocus = true;
    config.disableClose = false;
    config.panelClass = 'dialog-container';
    config.data = { recipe: this.recipe }
    const dr = this.dialog.open(InputRecipeComponent, config)

  }

  editButtonShow() {
    if (this.tokenService.getUser().id === this.recipe?.user2?.id) {
      return true;
    }
  }
  

  strikethroughText(event) {
    event.target.classList.toggle('instructions-Strikethrough');
  }

  openCollectionDialog() {
    const dialogRef = this.dialog.open(CollectionDialogComponent,{data: {recipe: this.recipe}});
  }

}
