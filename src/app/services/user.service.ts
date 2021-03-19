import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private readonly activeUserSubject = new BehaviorSubject<User>(null);
  readonly activeUser$ = this.activeUserSubject.asObservable();

  get activeUser(): User {
    return this.activeUserSubject.getValue();
  }

  set currentUser(user: User) {
    console.log(user)
    this.activeUserSubject.next(user);
  }

  constructor() { }
  
}
