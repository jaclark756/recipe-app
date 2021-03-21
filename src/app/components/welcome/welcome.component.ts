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

  constructor(
    private http: HttpClient, 
    private route: ActivatedRoute, 
    private tokenService: TokenService, 
    private userService: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    // const config = new MatDialogConfig();
    // config.disableClose = true;
    // config.panelClass = "panelStyle"

    // const token: string = this.route.snapshot.queryParamMap.get('token');
    // const error: string = this.route.snapshot.queryParamMap.get('error');
    // if (this.tokenService.getToken()) {
    //   this.isLoggedIn = true;
    //   this.userService.getCurrentUser().subscribe((data: any) => {
    //     this.currentUser = data;
    //     if (!data.enabled){
    //       const dialogRef = this.dialog.open(RegisterComponent, config);
    //     } else {
    //       // Redirect to home page
    //     }
    //   })
    // }
    // else if(token){
    //   this.tokenService.saveToken(token);
    //   this.userService.getCurrentUser().subscribe((data: any) => {
    //     this.currentUser = data;
    //     if (!data.enabled){
    //       const dialogRef = this.dialog.open(RegisterComponent, config);
    //     } else {
    //       // Redirect to home page
    //     }
    //   })
    // }
    // else if(error){

    //     // Need to display errorMessage in the view
    //     this.errorMessage = error;
    //     this.isLoginFailed = true;
    // } 
    // else {
    //   const dialogRef = this.dialog.open(LoginComponent, config);
    // }
  }

  fetchUserData(){

  }

};
