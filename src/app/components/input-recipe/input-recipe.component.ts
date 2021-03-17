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
      recipeName: new FormControl('', Validators.required),
      imageUri: new FormControl('', Validators.required),
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
          "imageUri": this.newRecipe.controls.imageUri.value,
          "cookTime": this.newRecipe.controls.cookTime.value,
          "prepTime": this.newRecipe.controls.prepTime.value
        }
        this.recipeService.addRecipe(recipe);
      }
    }
  
    // OLD ADDRECIPE
    // addRecipe() {
    //   if (this.newRecipe.valid) {
    //     this.recipeService.addRecipe({
    //       // TODO hook in active user to this function
    //       ingredients: this.newRecipe.get("ingredients").value,
    //       instructions: this.newRecipe.get("instructions").value,
    //       recipeName: this.newRecipe.get("recipeName").value,
    //       imageUri: this.newRecipe.get("imageUri").value,
    //       cookTime: this.newRecipe.get("cookTime").value,
    //       prepTime: this.newRecipe.get("prepTime").value
    //     })
    //   }
    // }
  
    // if (this.settingsForm.valid) {
    //   let settings = {
    //     "photoURL": this.settingsForm.controls.photoURL.value ? this.settingsForm.controls.photoURL.value : '', 
    //     "displayName": this.settingsForm.controls.displayName.value ? this.settingsForm.controls.displayName.value : '', 
    //     "bio": this.settingsForm.controls.bio.value ? this.settingsForm.controls.bio.value : ''
    //   }
  
    //   saveSettings(){
    //     if (this.settingsForm.valid){
    //       this.submitted = true;
    //       this.uploadProgress$ = of(0);
    
    //       let settings = {
    //         "photoURL": this.photoURL,
    //         "displayName": this.settingsForm.controls.displayName.value ? this.settingsForm.controls.displayName.value : '', 
    //         "bio": this.settingsForm.controls.bio.value ? this.settingsForm.controls.bio.value : ''
    //       }
  
    //     }
    
    //   }


}
