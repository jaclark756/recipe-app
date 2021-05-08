import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recipe } from '../types/recipe';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const HTTP_OPTIONS = {
    
  }

@Injectable({
  providedIn: 'root'
})
export class SearchService {

    userSearchValue$: Observable<any>;
    private url: string = environment.apiUrl + "/v2/recipe"
    private httpParams: HttpParams;

    buildUrl(url: string, ... params: any[]){
        if (params.length > 0){
          let str = url + "?"; 
          params.forEach((s) => {
            if (typeof(s) === "object"){
              str += s.k + "=" + s.v + "&"
            }
          })
          return str.slice(0, -1)
        } 
        return url
      }

    constructor(
        private http: HttpClient,
    ) {  }

    getUserSearchValue(): Observable<any> {
        return of(this.userSearchValue$);
    }

    setUserSearchValue(userSearch) {
        this.userSearchValue$ = userSearch;
        console.log("Search Service userSearchValue: ", this.userSearchValue$);
    }

    getSearchedRecipes(httpParams: HttpParams): Observable<Recipe[]> {
        return this.http.get(this.url, 
                            {params: httpParams, 
                             headers: new HttpHeaders({ 'Content-Type': 'application/json' })
                            }).pipe(map(response => {
            return response as Recipe[];
        }))
    }

}
