import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-input-recipe',
  templateUrl: './input-recipe.component.html',
  styleUrls: ['./input-recipe.component.scss']
})
export class InputRecipeComponent implements OnInit {

  newRecipe: FormGroup;

  constructor(public recipeService: RecipeService,
    private formbuilder: FormBuilder) {
    this.newRecipe = this.formbuilder.group({
      ingredients: new FormControl('', Validators.required),
      instructions: new FormControl('', Validators.required),
      recipeName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      imageUri: new FormControl(''),
      cookTime: new FormControl('', [Validators.required, Validators.min(0)]),
      prepTime: new FormControl('', [Validators.required, Validators.min(0)])
    })
  }

  ngOnInit(): void {
  }

    // NEW ADDRECIPE 

    addRecipe() {
      console.log(this.newRecipe);
      if (this.newRecipe.valid) {
        let recipe = {
          "ingredients": this.newRecipe.controls.ingredients.value,
          "instructions": this.newRecipe.controls.instructions.value,
          "recipeName": this.newRecipe.controls.recipeName.value,
          "imageUri": this.newRecipe.controls.imageUri.value ? this.newRecipe.controls.imageUri.value : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Filipino_style_spaghetti.jpg/1920px-Filipino_style_spaghetti.jpg",
          "cookTime": this.newRecipe.controls.cookTime.value,
          "prepTime": this.newRecipe.controls.prepTime.value,
          "userId": "1"
        }
        this.recipeService.addRecipe(recipe);
      }
    }
  
}
