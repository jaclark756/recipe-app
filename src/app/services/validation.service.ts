import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  BASE_URL: string = environment.apiUrl
  USERS_URL: string = "/api/v2/usernames"
  URL = this.BASE_URL + this.USERS_URL;
  usernames: any[];

  constructor(public http: HttpClient) { this.loadUsernames() }

  loadUsernames(){
    this.http.get(this.URL).subscribe((usernames: string[]) => {
      this.usernames = usernames
    })
  }

  userNameValidator(userControl: AbstractControl) { 
    return new Promise(resolve => {  
          if (this.usernames.includes(userControl.value)){
            resolve({taken: true});
          } else {
            resolve(null);
          }
    });  
  }  

}
