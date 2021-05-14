import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective, NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ingredient } from 'src/app/types/ingredient';
import { SearchService } from 'src/app/services/search.service';
import { MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { Category } from 'src/app/types/category';
import { CategoryService } from 'src/app/services/category.service';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {
  userSearch: FormGroup;
  filteredCategorie$: Observable<any[]>;
  filteredIngredient$: Observable<any[]>;
  categoryNames: any[];
  categories: Category[] = [];
  ingredients: Ingredient[] = []

  constructor(
    private formbuilder: FormBuilder, 
    private _searchService: SearchService, 
    private dr: MatDialogRef<SearchDialogComponent>,
    private router: RouterModule,
    private _categoryService: CategoryService,
    private _ingredientService: IngredientService,
  ) { 
    this.categoryNames = this.categories.map((category: any) => {
      return {name: category.name}
    })
  }

  ngOnInit(): void {
    this.userSearch = this.formbuilder.group({
      searchInput: new FormControl('')
    });
    this.getAllCategories();
    this.getAllIngredients();
  }

  private _filterCategories(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.categories.filter(category => category.name.toLowerCase().indexOf((filterValue)) === 0);
  }

  private _filterIngredients(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.ingredients.filter(ingredient => ingredient.content.toLowerCase().indexOf((filterValue)) === 0);
  }

  getAllCategories(): void {
    this._categoryService.getAllCategories().subscribe(response => {
      this.categories = response;
      this.filteredCategorie$ = this.userSearch.controls.searchInput.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ?  this._filterCategories(name) : this.categories.slice())
      );
    })
  }

  getAllIngredients(): void {
    this._ingredientService.getAllIngredients().subscribe(response => {
      this.ingredients = response;
      this.filteredIngredient$ = this.userSearch.controls.searchInput.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.content),
          map(content => content ?  this._filterIngredients(content) : this.ingredients.slice())
        );
    })
  }


  close(): void{
    this.dr.close();
  }

}
