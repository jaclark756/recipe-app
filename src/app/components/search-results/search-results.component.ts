import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Recipe } from 'src/app/types/recipe';

@Component({
    selector: 'seach-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
  })
  export class SearchResultsComponent implements OnInit {
    
    userSearchValue: string;
    httpParams: HttpParams = new HttpParams();
    recipes: Recipe[];
  
    constructor(
      private _searchService: SearchService,
      private route: ActivatedRoute,
      ) {
      console.log("this is loading")
     }
  
    ngOnInit(): void {
      this.getSearchValue();
    }

    getSearchValue(): void {
      this.route.queryParamMap.subscribe(param => {
        param.keys.forEach((k) => {
          this.httpParams = this.httpParams.set(k, param.get(k));
          // console.log("httpParams: ", this.httpParams.toString())
        });
        this._searchService.getSearchedRecipes(this.httpParams).subscribe(response => {
          this.recipes = response;
          console.log("recipes: ", this.recipes)
        })
        
        // pipe(map(response => {
        //   this.recipes = response;
        // }));
      })
    }
  }
  