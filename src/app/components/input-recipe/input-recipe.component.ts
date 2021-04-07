import { FormArray, FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Ingredient } from 'src/app/types/ingredient';
import { Instruction } from 'src/app/types/instruction';
import { Category } from 'src/app/types/category';
import { Observable } from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { newArray } from '@angular/compiler/src/util';


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
  // instruction2Control = new FormControl();
  newRecipe: FormGroup;
  // instructions: FormArray;
  currentUser: any;
  Ingredients: Ingredient[];
  ingredientsFromGroup: FormGroup;
  ingredients2: Ingredient[] = [];
  ingredientContent: string;
  ingredientQuantity: number;
  ingredientMeasure: string;
  Instructions: Instruction[];
  instructions2: Instruction[] = [
    {content: 'first instruction'}, 
    {content: 'second instruction'},
    {content: 'third instruction'},
    {content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'}
  ];
  finalInstructions: Instruction[];
  categories: Category[] = [{'name': 'Breakfast'}, {'name': 'Gluten Free'}];
  allCategories: Category[] = [{'name': 'Lunch'}, {'name': 'Dinner'}, {'name': 'Dessert'}];
  filteredCategories: Observable<Category[]>;

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('ingredientsFromGroup') private formDirective: NgForm;

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
    this.ingredientsFromGroup = this.formbuilder.group ({
      ingredient2ContentControl: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      ingredient2QuantityControl: new FormControl('', [Validators.required, Validators.max(99.9)]),
      ingredient2MeasureControl: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    })

    this.newRecipe = this.formbuilder.group({
      ingredients: new FormControl('', Validators.required),
      instructions: new FormArray([
        new FormControl('', Validators.required)
      ]),
      instruction2Control: new FormControl(''),
      recipeName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      imageUri: new FormControl(''),
      cookTime: new FormControl('', [Validators.required, Validators.min(0)]),
      prepTime: new FormControl('', [Validators.required, Validators.min(0)])
    })
    this.filteredCategories = this.categoryControl.valueChanges.pipe(
      startWith(null),
      map((category: string | null) => category ? this._filter(category) : this.allCategories.slice()));
    
    // this.instructions2.forEach(function(item, index) {
    //   console.log("item before: ", item);
    //   let orderOfItem = index;
    //   console.log("order: ", orderOfItem);
    //   item = {content: item.content, order: orderOfItem};
    //   console.log("item after: ", item);
    //   this.finalInstructions.push(item);
    //   console.log("finalInstructions: ", this.finalInstructions);
    // });
      
  }

  ngOnInit(): void {
    // console.log("final Instructions: ", this.finalInstructions)
    // this.instructions2.forEach((item, index) => {
    //   console.log("finalInstructions before: ", this.finalInstructions);
    //   console.log("item before: ", item);
    //   let orderOfItem = index;
    //   console.log("order: ", orderOfItem);
    //   item = {content: item.content, order: orderOfItem};
    //   console.log("item after: ", item);
    //   this.finalInstructions.push(item);
    //   console.log("finalInstructions: ", this.finalInstructions);
    // })
    this.instructions2 = this.instructions2.map((item, index) => {
      return item = {content: item.content, order: index};
      // console.log("map item: ", item);
    });
    console.log("instructions2 before: ", this.instructions2);
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

    addInstruction2(event) {
      console.log(this.newRecipe.controls.instruction2Control.value);
      this.instructions2.push({content: this.newRecipe.controls.instruction2Control.value, order: this.instructions2.length});
      this.newRecipe.controls.instruction2Control.reset();
    }

    removeInstruction2(selectedInstruction: Instruction) {
      this.instructions2 = this.instructions2.filter(instruction => selectedInstruction !== instruction);
      this.instructions2 = this.instructions2.map((item, index) => {
        return item = {content: item.content, order: index};
        // console.log("map item: ", item);
      });
    }

    addIngredients(event, formDirective: FormGroupDirective) {
      if (this.ingredientsFromGroup.valid){
        this.ingredients2.push({
          content: this.ingredientsFromGroup.controls.ingredient2ContentControl.value,
          quantity: this.ingredientsFromGroup.controls.ingredient2QuantityControl.value, 
          measure: this.ingredientsFromGroup.controls.ingredient2MeasureControl.value
        });
        this.ingredientsFromGroup.reset();
      }
      this.formDirective.resetForm('');
      this.ingredientsFromGroup.markAsPristine();
      this.ingredientsFromGroup.markAsUntouched();
      this.ingredientsFromGroup.updateValueAndValidity();    
    }

    removeIngredients(selectedIngredient: Ingredient) {
      this.ingredients2 = this.ingredients2.filter(ingredient => selectedIngredient !== ingredient);
    }

    drop(event: CdkDragDrop<Instruction[]>) {
      moveItemInArray(this.instructions2, event.previousIndex, event.currentIndex);
      this.instructions2 = this.instructions2.map((item, index) => {
        return item = {content: item.content, order: index};
        // console.log("map item: ", item);
      });
    }

    getInstructions(event) {
      console.log("instructions2 now: ", this.instructions2);
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
