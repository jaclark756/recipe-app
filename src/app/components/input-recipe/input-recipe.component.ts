import { FormArray, FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective, NgForm, FormsModule } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Ingredient } from 'src/app/types/ingredient';
import { Instruction } from 'src/app/types/instruction';
import { Category } from 'src/app/types/category';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { newArray } from '@angular/compiler/src/util';
import { MeasurementGroup } from 'src/app/types/measurement-group';


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
  
  ingredientMeasureOptions: MeasurementGroup[] = [
    {
      type: 'Popular',
      measurement : [
        {value: 'gram (g)'},
        {value: 'ounce (oz)'},
        {value: 'pound (lb)'},
        {value: 'teaspoon (tsp)'},
        {value: 'tablespoon (tbsp)'},
        {value: 'cup (cup)'}
      ]
    },
    {
      type: 'Weight',
      measurement : [
        {value: 'milligram (mg)'},
        {value: 'kilogram (kg)'},
        {value: 'gram (g)'},
        {value: 'ounce (oz)'},
        {value: 'pound (lb)'}
      ]
    },
    {
      type: 'Volume',
      measurement: [
        {value: 'teaspoon (tsp)'},
        {value: 'tablespoon (tbsp)'},
        {value: 'cup (cup)'},
        {value: 'fluid ounce (fl oz)'},
        {value: 'pint (pt)'},
        {value:'quart (qt)'},
        {value: 'gallon (gal)'},
        {value: 'milliliters (ml)'},
        {value: 'liters (l)'}
      ]
    }
  ];
  
  Instructions: Instruction[];
  instructions2: Instruction[] = [
    { content: 'first instruction' },
    { content: 'second instruction' },
    { content: 'third instruction' },
    { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' }
  ];
  finalInstructions: Instruction[];
  categories: Category[] = [{ 'name': 'Breakfast' }, { 'name': 'Gluten Free' }];
  allCategories: Category[] = [{ 'name': 'Lunch' }, { 'name': 'Dinner' }, { 'name': 'Dessert' }];
  allCategoriesString: string[] = ['Lunch', 'Dinner', 'Dessert']
  filteredCategories: Observable<Category[]>;

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('ingredientsFromGroup') private formDirective: NgForm;

  constructor(
    private recipeService: RecipeService,
    private formbuilder: FormBuilder, 
    public userService: UserService,
    public tokenService: TokenService
  ) {
    this.currentUser = this.tokenService.getUser();
    this.ingredientsFromGroup = this.formbuilder.group({
      ingredient2ContentControl: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      ingredient2QuantityControl: new FormControl('', [Validators.required, Validators.max(99.9)]),
      ingredient2MeasureControl: new FormControl('', Validators.required),
    })
    this.newRecipe = this.formbuilder.group({
      ingredients: new FormArray([
        this.formbuilder.group({
          ...this.ingredientsFromGroup,
        })]),
      instructions: new FormArray([
        new FormControl('', Validators.required)
      ]),
      instruction2Control: new FormControl(''),
      categoryControl: new FormControl(''),
      recipeName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      imageUri: new FormControl(''),
      cookTime: new FormControl('', [Validators.required, Validators.min(0)]),
      prepTime: new FormControl('', [Validators.required, Validators.min(0)])
    })
  }

  ngOnInit(): void {
    this.instructions2 = this.instructions2.map((item, index) => {
      return {content: item.content, order: index};
    });
    this.filteredCategories = this.newRecipe.controls.categoryControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.allCategories.slice())
      );
  }

    // NEW ADDRECIPE 

    addRecipe(event) {
      console.log(this.newRecipe);
      console.log(this.newRecipe.valid);
      if (this.newRecipe.valid) {
        let recipe = {
          "title": this.newRecipe.controls.recipeName.value,
          "categories": this.categories,
          "ingredients": this.ingredients2,
          "instructions": this.instructions2,
          "photoUrl": this.newRecipe.controls.imageUri.value ? this.newRecipe.controls.imageUri.value : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Filipino_style_spaghetti.jpg/1920px-Filipino_style_spaghetti.jpg",
          "cookTime": this.newRecipe.controls.cookTime.value,
          "prepTime": this.newRecipe.controls.prepTime.value
        }
        console.log(recipe);
        this.recipeService.addRecipe(recipe);
      }
    }

    //// START Instruction Logic ////
    addInstruction2(event) {
      console.log(this.newRecipe.controls.instruction2Control.value);
      this.instructions2.push({content: this.newRecipe.controls.instruction2Control.value, instructionOrder: this.instructions2.length});
      this.newRecipe.controls.instruction2Control.reset();
    }

    removeInstruction2(selectedInstruction: Instruction) {
      this.instructions2 = this.instructions2.filter(instruction => selectedInstruction !== instruction);
      this.instructions2 = this.instructions2.map((item, index) => {
        return {...item, instructionOrder: index};
      });
    }

    drop(event: CdkDragDrop<Instruction[]>) {
      moveItemInArray(this.instructions2, event.previousIndex, event.currentIndex);
      this.instructions2 = this.instructions2.map((item, index) => {
        return {...item, instructionOrder: index};
      });
    }

  //// END Instruction Logic ////


  //// START Ingredient Logic ////
  addIngredients(event, formDirective: FormGroupDirective) {
    if (this.ingredientsFromGroup.valid) {
      (<FormArray>this.newRecipe.controls.ingredients).push(
        this.formbuilder.group({
          content: this.ingredientsFromGroup.controls.ingredient2ContentControl.value,
          quantity: this.ingredientsFromGroup.controls.ingredient2QuantityControl.value,
          measure: this.ingredientsFromGroup.controls.ingredient2MeasureControl.value
        })
      );
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


  //// END Ingredient Logic ////


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


  //// START Category Input Logic ////
  add(event: MatChipInputEvent): void {
  }

  remove(categoryName: Category): void {
    this.categories = this.categories.filter(category => categoryName.name !== category.name);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.categories.push({ name: event.option.viewValue });
    this.categoryInput.nativeElement.value = '';
    this.newRecipe.controls.categoryControl.setValue('');
  }

  displayFn(category: Category): string {
    return category && category.name ? category.name : '';
  }

  private _filter(value: string): Category[] {
    const filterValue = value.toLowerCase();
    return this.allCategories.filter(category => category.name.toLowerCase().indexOf(filterValue) === 0);
  }
  //// END Category Input Logic ////

}
