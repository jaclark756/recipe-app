import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/types/ingredient';
import { Instruction } from 'src/app/types/instruction';
import { Category } from 'src/app/types/category';
import { Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import { isObject } from 'util';


@Component({
  selector: 'app-input-recipe',
  templateUrl: './input-recipe.component.html',
  styleUrls: ['./input-recipe.component.scss']
})
export class InputRecipeComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryControl = new FormControl();
  newRecipe: FormGroup;
  // instructions: FormArray;
  currentUser: any;
  Ingredients: Ingredient[];
  Instructions: Instruction[];
  categories: Category[] = [{'name': 'Breakfast'}, {'name': 'Gluten Free'}];
  allCategories: Category[] = [{'name': 'Lunch'}, {'name': 'Dinner'}, {'name': 'Dessert'}];
  filteredCategories: Observable<Category[]>;

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    public recipeService: RecipeService,
    private formbuilder: FormBuilder, 
    public userService: UserService,
    public tokenService: TokenService
  ) {
    this.currentUser = this.tokenService.getUser();

    // this.instructions = this.formbuilder.array([
    //   new FormControl('', Validators.required)
    // ])

    this.newRecipe = this.formbuilder.group({
      ingredients: new FormControl('', Validators.required),
      instructions: new FormArray([
        new FormControl('', Validators.required)
      ]),
      recipeName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      imageUri: new FormControl(''),
      cookTime: new FormControl('', [Validators.required, Validators.min(0)]),
      prepTime: new FormControl('', [Validators.required, Validators.min(0)])
    })
    this.filteredCategories = this.categoryControl.valueChanges.pipe(
      startWith(null),
      map((category: string | null) => category ? this._filter(category) : this.allCategories.slice()));
  }

  ngOnInit(): void {
  }

    // NEW ADDRECIPE 

    addRecipe(event) {
      console.log(this.newRecipe);
      if (this.newRecipe.valid) {
        let recipe = {
          "ingredients": this.newRecipe.controls.ingredients.value,
          "instructions": this.newRecipe.controls.instructions.value,
          "title": this.newRecipe.controls.recipeName.value,
          "photoUrl": this.newRecipe.controls.imageUri.value ? this.newRecipe.controls.imageUri.value : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Filipino_style_spaghetti.jpg/1920px-Filipino_style_spaghetti.jpg",
          "cookTime": this.newRecipe.controls.cookTime.value,
          "prepTime": this.newRecipe.controls.prepTime.value,
          "userId": "1"
        }
        this.recipeService.addRecipe(recipe);
      }
    }

    addInstruction(event) { 
      console.log("pressed button");
      console.log((<FormArray>this.newRecipe.get("instructions")).controls);
      (<FormArray>this.newRecipe.get("instructions")).push(new FormControl('', Validators.required));
    }
    removeInstruction(event) {
      // form array loop has index, need to have button next to form field that passes in the index from loop and uses it to remove form control from the form array
    }

    add(event: MatChipInputEvent): void {
      const input = event.input;
      const value = event.value;
  
      // Add our fruit
      if ((value || '').trim()) {
        this.categories.push({name: value.trim()});
      }
        // Reset the input value
      if (input) {
        input.value = '';
      }

      this.categoryControl.setValue(null);
    }

    remove(categoryName: Category): void {
      this.categories = this.categories.filter(category => categoryName.name !== category.name);
    }

    selected(event: MatAutocompleteSelectedEvent): void {
      this.categories.push({name: event.option.viewValue});

      this.categoryControl.setValue(null);
    }

    private _filter(value: string | Object): Category[] {
      if (value && value instanceof String) {
        const filterValue = (<string>value).toLowerCase();
        return this.allCategories.filter(category => category.name.toLowerCase().indexOf(filterValue) === 0);
      }
    }
  
}
