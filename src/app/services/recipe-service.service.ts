import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from '../types/recipe';

@Injectable({
  providedIn: 'root'
})

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}
export class RecipeServiceService {

  constructor(private http: HttpClient) {
    this.http.get(`${this.url}`).subscribe( s => {
      this.recipeSubject.next(s as Recipe[]);
    })
   }

  private url: string = environment.apiUrl+"/recipe"
  private readonly recipeSubject = new BehaviorSubject<Recipe[]>([]);
  readonly recipe$ = this.recipeSubject.asObservable();





}
