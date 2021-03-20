import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  API_BASE: string = "http://localhost:8080/oauth2/authorization/"
  REDIRECT: string = "?redirect_uri=http://localhost:4200/login";
  githubURI: string = this.API_BASE + "github" + this.REDIRECT;
  googleURI: string = this.API_BASE + "google" + this.REDIRECT;

  constructor( ) { }

  ngOnInit(): void { }

}
