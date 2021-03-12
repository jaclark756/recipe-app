import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-input-recipe',
  templateUrl: './input-recipe.component.html',
  styleUrls: ['./input-recipe.component.css']
})
export class InputRecipeComponent implements OnInit {

  newRecipe: FormGroup;

  constructor(public recipeService: RecipeService,
    private formbuilder: FormBuilder) {
    this.newRecipe = this.formbuilder.group({
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
      recipeName: ['', Validators.required],
      imageUri: ['', Validators.required],
      cookTime: ['', Validators.required, Validators.min(0)],
      prepTime: ['', Validators.required, Validators.min(0)]
    })
  }

  ngOnInit(): void {
  }

  addRecipe() {
    if (this.newRecipe.valid) {
      this.recipeService.addRecipe({
        id: null,
        // TODO hook in active user to this function
        userId: null,
        ingredients: this.newRecipe.get("recipe").value,
        instructions: this.newRecipe.get("instructions").value,
        recipeName: this.newRecipe.get("name").value,
        imageUri: this.newRecipe.get("imageUri").value,
        cookTime: this.newRecipe.get("cookTime").value,
        prepTime: this.newRecipe.get("prepTime").value
      })
    }
  }


}
