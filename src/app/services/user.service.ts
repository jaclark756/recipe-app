import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  USER_API: string = "http://localhost:8080/api/user"
  
  constructor(private http: HttpClient) { }

  private readonly activeUserSubject = new BehaviorSubject<User>(null);
  readonly activeUser$ = this.activeUserSubject.asObservable();

  get activeUser(): User {
    return this.activeUserSubject.getValue();
  }

  set currentUser(user: User) {
    console.log(user)
    this.activeUserSubject.next(user);
  }


  getCurrentUser(): Observable<any> {
    return this.http.get(this.USER_API)
      // , this.httpOptions);
  }
  
}
