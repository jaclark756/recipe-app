import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient } from '../types/ingredient';
import { environment } from '../../../src/environments/environment';
import { map } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
    providedIn: 'root'
  })

export class IngredientService {

    private url: string = environment.apiUrl + "/api/v2/ingredient"
    
    constructor(private http: HttpClient){}

    getAllIngredients(): Observable<Ingredient[]> {
        return this.http.get(this.url, httpOptions).pipe(map(response => {
            return response as Ingredient[];
        }))
    }

}