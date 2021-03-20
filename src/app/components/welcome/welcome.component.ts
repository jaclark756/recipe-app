import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {


  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;
  API_BASE: string = "http://localhost:8080/oauth2/authorization/"
  REDIRECT: string = "?redirect_uri=http://localhost:4200/login";
  githubURI: string = this.API_BASE + "github" + this.REDIRECT;
  googleURI: string = this.API_BASE + "google" + this.REDIRECT;

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute, 
    private tokenService: TokenService, 
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    const config = new MatDialogConfig();
    config.disableClose = true;
    config.panelClass = "panelStyle"
    // const dialogRef = this.dialog.open(LoginComponent, config);


    const token: string = this.route.snapshot.queryParamMap.get('token');
    const error: string = this.route.snapshot.queryParamMap.get('error');
    if (this.tokenService.getToken()) {
      console.log("got here, tokenservice found token");
      console.log(this.tokenService.getToken());
      this.isLoggedIn = true;
      this.userService.getCurrentUser().subscribe((data: any) => {
        this.currentUser = data;
        if (!data.enabled){
          const dialogRef = this.dialog.open(RegisterComponent, config);

        }
      })
      // console.log(this.currentUser);
      // this.userService.getCurrentUser().subscribe(
      //   data => {
      //     console.log(data);
      //   }
      // )
    }
    else if(token){
      console.log("NEW TOKEN: ", token);
      this.tokenService.saveToken(token);
      // this.userService.getCurrentUser().subscribe(
      //   data => {
      // // this.login(data);
      //     console.log(data);
      //   },
      //     err => {
      //       this.errorMessage = err.error.message;
      //       this.isLoginFailed = true;
      //     }
      // );
    }
    else if(error){

        // Need to display errorMessage in the view
        this.errorMessage = error;
        this.isLoginFailed = true;
    } else {
      const dialogRef = this.dialog.open(LoginComponent, config);
    }
  }

};
