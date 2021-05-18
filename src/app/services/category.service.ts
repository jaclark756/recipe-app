import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../types/category';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
    providedIn: 'root'
  })
  
  export class CategoryService {

    private url: string = environment.apiUrl + "/api/v2/category"
    
    constructor(private http: HttpClient){}

    getAllCategories(): Observable<Category[]> {
        return this.http.get(this.url, httpOptions).pipe(map(response => {
            return response as Category[];
        }))
    }

    getCategoryById(categoryId: number): Observable<Category> {
        let categoryIdUrl = this.url + '/' + categoryId;
        return this.http.get(categoryIdUrl, httpOptions).pipe(map(response => {
            return response as Category;
        }))
    }

  }