import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  USER_API: string = environment.apiUrl + "/api/v2/user"
  
  constructor(private http: HttpClient) { this.getCurrentUser()}

  private readonly activeUserSubject = new BehaviorSubject<User>(null);
  readonly activeUser$ = this.activeUserSubject.asObservable();

  get activeUser(): User {
    return this.activeUserSubject.getValue();
  }

  set activeUser(user: User) {
    this.activeUserSubject.next(user);
  }

  getCurrentUser(){
    return this.http.get(this.USER_API);
  }
  
}
