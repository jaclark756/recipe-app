import { FormArray, FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective, NgForm, FormsModule } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit, ViewChild, ElementRef, Input, Inject } from '@angular/core';
import { Ingredient } from 'src/app/types/ingredient';
import { Instruction } from 'src/app/types/instruction';
import { Category } from 'src/app/types/category';
import { Observable } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { startWith, map } from 'rxjs/operators';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent, MatAutocomplete } from '@angular/material/autocomplete';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef} from '@angular/material/dialog';
import { Recipe } from 'src/app/types/recipe';
import { ingredientMeasureOptions } from 'src/app/helpers/ingredient-measurement-options';
import { RecipeUpdateNote } from 'src/app/types/recipeUpdateNote';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { sortAscendingPriority } from '@angular/flex-layout';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
  newRecipe: FormGroup;
  apiRecipe: FormGroup;
  currentUser: any;
  Ingredients: Ingredient[];
  ingredientsFormGroup: FormGroup;
  ingredients2: Ingredient[] = [];
  ingredientContent: string;
  ingredientQuantity: number;
  ingredientMeasure: string;
  ingredientMeasureOptions = ingredientMeasureOptions;
  notes: RecipeUpdateNote[] = [];
  currentDate = new Date();
  currentDateFormatted: string;
  Instructions: Instruction[];
  instructions2: Instruction[] = [];
  finalInstructions: Instruction[];
  categories: Category[] = [];
  allCategories: Category[] = [];
  filteredCategories: Observable<Category[]>;
  existingRecipe: Recipe;
  recipeId: number;
  editInstructions: number = null;
  IMPORT_URL: string = environment.importUrl
  // TODO add Boolean logic for form validation
  instructionsNotEmpty = false;
  ingredientsNotEmpty = false;
  // END TODO

  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  @ViewChild('ingredientsFormGroup') private formDirective: NgForm;

  constructor(
    private recipeService: RecipeService,
    private formbuilder: FormBuilder, 
    public userService: UserService,
    public tokenService: TokenService,
    private categoryService: CategoryService,
    public router: Router,
    private dr: MatDialogRef<InputRecipeComponent>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.currentUser = this.tokenService.getUser();
    this.currentDateFormatted = formatDate(this.currentDate, 'MM-dd-yyyy', 'en-US')
  }

  ngOnInit(): void {
    this.existingRecipe = this.data ? this.data.recipe : null;
    this.categoryService.getAllCategories().subscribe(response => {
      this.allCategories = response.sort((a,b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1);
      this.filteredCategories = this.newRecipe.controls.categoryControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.allCategories.slice())
      );
    })
    this.setForm()
  }

  setForm(){
    this.ingredients2 = this.existingRecipe ? this.existingRecipe.ingredients : [];
    this.categories = this.existingRecipe ? this.existingRecipe.categories : [];
    this.apiRecipe = this.formbuilder.group ({
      recipeURLControl: new FormControl('') 
    })
    this.ingredientsFormGroup = this.formbuilder.group ({
      content: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      quantity: new FormControl('', [Validators.required, Validators.max(99.9)]),
      measure: new FormControl('', Validators.required),
      id: new FormControl('')
    })
    this.newRecipe = this.formbuilder.group({
      instruction2Control: new FormControl(''),
      categoryControl: new FormControl(''),
      recipeName: new FormControl(this.existingRecipe ? this.existingRecipe.title : '', [Validators.required, Validators.maxLength(100)]),
      imageUri: new FormControl(this.existingRecipe ? this.existingRecipe.photoUrl : ''),
      cookTime: new FormControl(this.existingRecipe ? this.existingRecipe.cookTime : '', [Validators.required, Validators.min(0)]),
      prepTime: new FormControl(this.existingRecipe ? this.existingRecipe.prepTime : '', [Validators.required, Validators.min(0)]),
      notesControl: new FormControl('')
    })
    this.instructions2 = this.instructions2.map((item, index) => {
      return {content: item.content, order: index};
    });
    this.instructions2 = this.existingRecipe ? this.existingRecipe.instructions : this.instructions2;
    
    // this.notes = this.existingRecipe.notes || [];
  }

    // ADDRECIPE LOGIC /// 

    addRecipe(event) {
      if (this.instructions2.length && this.ingredients2.length){
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
          this.recipeService.addRecipe(recipe);
          this.dr.close();
        }
      } console.info("Missing Instructions or ingredients");
  }

    updateRecipe(event) {
      this.recipeId = this.existingRecipe.id;
      if (this.newRecipe.valid) {
        let recipe = {
          "id": this.recipeId,
          "title": this.newRecipe.controls.recipeName.value,
          "categories": this.categories,
          "ingredients": this.ingredients2,
          "instructions": this.instructions2,
          "photoUrl": this.newRecipe.controls.imageUri.value ? this.newRecipe.controls.imageUri.value : "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Filipino_style_spaghetti.jpg/1920px-Filipino_style_spaghetti.jpg",
          "cookTime": this.newRecipe.controls.cookTime.value,
          "prepTime": this.newRecipe.controls.prepTime.value,
          "notes": this.notes
        }
      this.recipeService.updateRecipe(recipe);
      this.dr.close();
    }
    
    
  }

    //// START Instruction Logic ////
    addInstruction2(event) {
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

    editInstruction(index: number) {
      this.editInstructions = index;
      this.newRecipe.controls.instruction2Control.setValue(this.instructions2.find(ins => ins.instructionOrder == index).content);
    }
    saveEditInstruction(event) {
      this.instructions2.find(ins => ins.instructionOrder == this.editInstructions).content = this.newRecipe.controls.instruction2Control.value;
      this.editInstructions = null;
      this.newRecipe.controls.instruction2Control.reset();
    }
  //// END Instruction Logic ////


  //// START Ingredient Logic ////
  addIngredients(event, formDirective: FormGroupDirective) {
    if (this.ingredientsFormGroup.valid) {
      this.ingredients2.push({
        content: this.ingredientsFormGroup.controls.content.value,
        quantity: this.ingredientsFormGroup.controls.quantity.value,
        measure: this.ingredientsFormGroup.controls.measure.value
      });
      this.ingredientsFormGroup.reset();
    }
    // this.formDirective.resetForm('');
    this.ingredientsFormGroup.markAsPristine();
    this.ingredientsFormGroup.markAsUntouched();
    this.ingredientsFormGroup.updateValueAndValidity();
  }

  removeIngredients(selectedIngredient: Ingredient) {
    this.ingredients2 = this.ingredients2.filter(ingredient => selectedIngredient !== ingredient);
  }

  editIngredient(ingEdit: Ingredient) {
    this.ingredientsFormGroup.controls.id.setValue(ingEdit.id);
    this.ingredientsFormGroup.controls.content.setValue(ingEdit.content);
    this.ingredientsFormGroup.controls.quantity.setValue(ingEdit.quantity);
    this.ingredientsFormGroup.controls.measure.setValue(ingEdit.measure);
    this.ingredients2 = this.ingredients2.filter(ing => ingEdit !== ing);
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
    this.newRecipe.controls.categoryControl.setValue(null);
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

  //// START Notes Input Logic ////

  addNotes(event) {
    this.notes.push({note: this.newRecipe.controls.notesControl.value, timestamp: this.currentDateFormatted});
    this.newRecipe.controls.notesControl.reset();
  }

  removeNote(selectedNote: RecipeUpdateNote) {
    this.notes = this.notes.filter(note => selectedNote !== note);
  }

  //// END Notes Input Logic ////


  getAPIdata(event) {
    this.http.post(this.IMPORT_URL, 
                  {"url": this.apiRecipe.controls.recipeURLControl.value}, 
                  {headers: new HttpHeaders({ 'Content-Type': 'application/json'})}
      ).subscribe((response: any) => {
        this.existingRecipe = this.recipeService.mapToRecipeObject(response)
        this.setForm()
    })
  }

  parseTime(isoString: string){
    let time = isoString.split("T").pop()
    let increment = time.slice(-1)
    switch (increment){
      case "M":
        return +time.split("M")[0]
      case "H":
        return ((+time.split("H")[0])/60)
    }
  }

  close(): void{
    this.dr.close();
  }
}
