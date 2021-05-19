import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { ValidationService } from 'src/app/services/validation.service';
import { PrivacyPolicyComponent } from 'src/app/shared/components/privacy-policy/privacy-policy.component';
import { TermsComponent } from 'src/app/shared/components/terms/terms.component';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  SIGNUP_URL: string = "/api/v2/user"
  UPDATE_URL = environment.apiUrl + this.SIGNUP_URL;

  signUpForm: FormGroup;

  constructor(
    private http: HttpClient,
    public fb: FormBuilder,
    public validationService: ValidationService,
    private tokenService: TokenService,
    public router: Router,
    public dialog: MatDialog
  ) {
    this.signUpForm = fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(4)], this.validationService.userNameValidator.bind(this.validationService))
    })
   }

  ngOnInit(): void {
  }

  signUp(event){
    let user = this.tokenService.getUser();
    user.username = this.signUpForm.get("username").value;
    user.enabled = true;
    this.http.put(this.UPDATE_URL, user).subscribe(
      (res: any) => {
        this.tokenService.saveUser(res);
        if (res.username != null){
          this.router.navigate(['home']); 
        }
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

  openTermsDialog() {
    const dialogRef = this.dialog.open(TermsComponent);
  }

  openPrivacyDialog() {
    const dialogRef = this.dialog.open(PrivacyPolicyComponent);
  }

}
