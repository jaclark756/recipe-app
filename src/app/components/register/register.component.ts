import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidationService } from 'src/app/services/validation.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  BASE_URL: string = "http://localhost:8080/"
  USERS_URL: string = "/v2/usernames"
  SIGNUP_URL: string = "/v2/user/update"
  URL = this.BASE_URL + this.USERS_URL;
  UPDATE_URL = environment.apiUrl + this.SIGNUP_URL;

  signUpForm: FormGroup;

  constructor(
    private http: HttpClient,
    public fb: FormBuilder,
    public validationService: ValidationService,
    public router: Router
  ) {
    this.signUpForm = fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(4)], this.validationService.userNameValidator.bind(this.validationService))
    })
   }

  ngOnInit(): void {
  }

  signUp(event){
    alert("signed up!");
    console.log(this.UPDATE_URL);
    console.log(this.signUpForm.value);
    this.http.put(this.UPDATE_URL, this.signUpForm.value).subscribe(
      res => {
        console.log(res)
        this.router.navigate(['home']);        
      }
    );
  

  }

  getErrorMessage(){
    if (this.signUpForm.get('username').hasError('minlength')){
      return "Must be at least 4 characters"
    } else if (this.signUpForm.get("username").hasError('required')){
      return "You must enter a value";
    }
    return this.signUpForm.get("username").hasError("taken") ? 'Username already taken' : '';

  }

}
