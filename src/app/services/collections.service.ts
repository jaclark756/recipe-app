import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Collection } from '../types/collection';
import { User } from '../types/user';
import { TokenService } from 'src/app/services/token.service';
import { Recipe } from '../types/recipe';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})

export class CollectionService {

  private url: string;
  private readonly collectionsSubject = new BehaviorSubject<Collection[]>([]);
  readonly collection$ = this.collectionsSubject.asObservable();

  constructor(private http: HttpClient, public tokenService:TokenService) {
    this.url = environment.apiUrl +"/api/profile/collections/user/"+this.tokenService.getUser().id;
    this.http.get(`${this.url}`).subscribe(s => {
      this.collectionsSubject.next(s as Collection[]);
    })
  }

  get collections(): Collection[] {
    return this.collectionsSubject.getValue();
  }

  set collections(collections: Collection[]) {
    this.collectionsSubject.next(collections);
  }

  getCollectionsByUser(userId: number) {
    return this.http.get(`${this.url}`, httpOptions).pipe(map(response => {
      return response as Collection[];
    }))
  }

  addCollection(collection: Collection): void {
    this.http.post(`${this.url}`, collection, httpOptions).subscribe((response: Collection) => {
      this.collections = [
        ...this.collections.filter(col => col.id !== collection.id), response
      ]
    });
  }

    saveRecipe2Collection(collectionId: number, recipe: Recipe):  void {
      this.http.post(`${environment.apiUrl}/api/profile/collections/${collectionId}`,recipe, httpOptions).subscribe((response: Collection) => {
        this.collections = [
          ...this.collections.filter(col => col.id !== collectionId), response
        ]
      });
  }

}
