import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Recipe } from 'src/app/types/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { Category } from 'src/app/types/category';
import { CategoryService } from 'src/app/services/category.service';
import { Response } from 'selenium-webdriver/http';
import { Ingredient } from 'src/app/types/ingredient';
import { IngredientService } from 'src/app/services/ingredient.service';

@Component({
    selector: 'seach-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
  })
  export class SearchResultsComponent implements OnInit {
    
    userSearchValue: any;
    userSearchType: string;
    httpParams: HttpParams = new HttpParams();
    recipes: Recipe[];
  
    constructor(
      private _searchService: SearchService,
      private _recipeService: RecipeService,
      private _categoryService: CategoryService,
      private _ingredientService: IngredientService,
      private route: ActivatedRoute,
      ) {
     }
  
    ngOnInit(): void {
      this.getSearchValue();
    }

    getSearchValue(): void {
      this.route.queryParamMap.subscribe(param => {
        param.keys.forEach((k) => {
          if (k === "category") {
            this.userSearchType = "category"
            this.userSearchValue = param.get(k);
          } else if (k === "ingredient") {
            this.userSearchType = "ingredient"
            this.userSearchValue = param.get(k);
          } else {
            this.userSearchType = "q"
            if (!this.userSearchValue) {
              this.userSearchValue = param.get(k);
            } else {
              this.userSearchValue = this.userSearchValue + " " + param.get(k);
            }
          }
          this.httpParams = this.httpParams.set(k, param.get(k));
        });
        if (this.userSearchType === "category" || this.userSearchType === "ingredient") {
          this._recipeService.findRecipesByCategoryOrIngredientId(this.httpParams).subscribe(response => {
            this.recipes = response;
          });
          if (this.userSearchType === "category") {
            this._categoryService.getCategoryById(this.userSearchValue).subscribe(response => {
              this.userSearchValue = response.name;
            })
          } else if (this.userSearchType === "ingredient") {
            this._ingredientService.getIngredientById(this.userSearchValue).subscribe(response => {
              this.userSearchValue = response.content;
            })
          }
        } else {
          this._searchService.getSearchedRecipes(this.httpParams).subscribe(response => {
            this.recipes = response;
          })
        }
        
      })
    }
  }
  