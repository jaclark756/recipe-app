import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  BASE_URL: string = environment.apiUrl
  USERS_URL: string = "/api/usernames"
  URL = this.BASE_URL + this.USERS_URL;

  constructor(public http: HttpClient) { }

  checkUsername(){
    this.http.get(this.URL).subscribe
  }

  userNameValidator(userControl: AbstractControl) { 
    return new Promise(resolve => {  
      setTimeout(() => {  

        this.http.get(this.URL).subscribe((s: string[]) => {
          if (s.includes(userControl.value)){
            resolve({taken: true});
          } else {
            resolve(null);
          }
        })
      }, 300);  
    });  
  }  

}
