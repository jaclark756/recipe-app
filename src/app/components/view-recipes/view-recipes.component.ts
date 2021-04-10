import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/types/recipe';
import { InputRecipeComponent } from '../input-recipe/input-recipe.component';

@Component({
  selector: 'app-view-recipes',
  templateUrl: './view-recipes.component.html',
  styleUrls: ['./view-recipes.component.scss']
})
export class ViewRecipesComponent implements OnInit {

  public recipe: Recipe;
  public ingredients: string[];
  public instructions: string[];

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getRecipe();
  }

  getRecipe(): void {
    this.route.paramMap.subscribe(param => {
      this.recipeService.getRecipe(+param.get('id')).subscribe(recipe => {
        this.recipe= recipe;
        this.ingredients = recipe.ingredients.map(ingredient => ingredient.content);
        this.instructions = recipe.instructions.map(instruction => instruction.content)
      });
    })
  }

  ingredientList = [
    "Asparagus",
    "Jordan's Latest eyeroll",
    "Jackie's Coolness",
    "Ryan's Tears",
    "1 Cup Sugar",
    "Cheezits",
    "Cale's 'u w0nt' quote",
    "Ravioli",
    "Crabgrass",
    "Beetles",
    "1/2 cup dumpster juice",
    "A human hand",
    "Fetta Cheese",
    "The J&J Covid Vaccine"
]

  instructionList = [
    "1. Preheat oven to 700 degrees Kelvin",
    "2. Turn on centrifuge at 400rpm",
    "3. Slam 3 Redbulls",
    "4. Celebrate with a Commit",
    "5. Mix all ingredients in a kiddie pool with 17 gallons of water",
    "6. Use paverbase tamper to mash everything into small chunks",
    "7. Simmer on stove for 20 min",
    "8. Let cool for 5 min off stove",
    "9. Serve with Parsely garnish",
  ]



  editRecipeDialog() {
    const config = new MatDialogConfig();
    config.autoFocus = true;
    config.disableClose = false;
    config.panelClass = 'dialog-container';
    config.data = { recipe: this.recipe }
    const dr = this.dialog.open(InputRecipeComponent, config)

  }
}
