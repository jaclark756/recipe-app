import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RECIPES } from 'src/app/helpers/sample-data';
import { NUTRIENTS } from 'src/app/helpers/sample-data';
import { RecipeService } from 'src/app/services/recipe.service';
import { Ingredient } from 'src/app/types/ingredient';
import { Instruction } from 'src/app/types/instruction';
import { NutrientEntity } from 'src/app/types/NutrientEntity';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-view-recipes',
  templateUrl: './view-recipes.component.html',
  styleUrls: ['./view-recipes.component.scss'],
})
export class ViewRecipesComponent implements OnInit {
  public recipe: Recipe;
  public ingredients: Ingredient[];
  public instructions: Instruction[];
  public nutrition = NUTRIENTS;
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
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    this.route.paramMap.subscribe((param) => {
      this.recipeService.getRecipe(+param.get('id')).subscribe((recipe) => {
        this.recipe = recipe;
        this.ingredients = recipe.ingredients;
        this.instructions = recipe.instructions;
      });

      this.recipeService.getNutritionalInfo(+param.get('id')).subscribe(nutrition=>{
        this.nutrition = nutrition;
        console.log(this.nutrition)
      });

    });
  }

  strikethroughText(event) {
    event.target.classList.toggle('instructions-Strikethrough');
  }
}
