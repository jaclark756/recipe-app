import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { PrivacyPolicyComponent } from 'src/app/shared/components/privacy-policy/privacy-policy.component';
import { TermsComponent } from 'src/app/shared/components/terms/terms.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { User } from 'src/app/types/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  panelOpenState = false;
  activeUser: User;
  commentsChecked: boolean;
  followersChecked: boolean;
  likesChecked: boolean;
  recipeChecked: boolean;
  prevDisplayName: string;
  editProfile: FormGroup;
  contactUs: FormGroup;

  SIGNUP_URL: string = "/api/v2/user"
  UPDATE_URL = environment.apiUrl + this.SIGNUP_URL;
  
  constructor(
    public fb: FormBuilder,
    public snackbar: SnackbarService,
    public tokenService: TokenService,
    public userService: UserService,
    public http: HttpClient,
    public dialog: MatDialog
  ) {
      this.activeUser = this.tokenService.getUser();
      this.commentsChecked = this.activeUser.commentNotifications;
      this.likesChecked = this.activeUser.likeNotifications
      this.followersChecked = this.activeUser.newFollowerNotifications;
      this.recipeChecked = this.activeUser.recipeSavedNotifications;
      this.editProfile = this.fb.group({
        displayname: new FormControl(this.activeUser.displayName ,[Validators.minLength(3), Validators.maxLength(50)])
      })
     }

  ngOnInit(): void {
    this.prevDisplayName = this.editProfile.get("displayname").value;
  }

  updateProfile() {
    if (this.editProfile.valid && this.editProfile.dirty) {
      let user = this.tokenService.getUser();
      user.displayName = this.editProfile.get("displayname").value;
      this.http.put(this.UPDATE_URL, user).subscribe(
        (res: any) => {
          this.snackbar.openSnackBar("Your changes have been saved!")
          this.tokenService.saveUser(res);
        }
      );
    }
    else {
      this.snackbar.openSnackBar("ERROR: There are no changes to be saved");
    }
  }

  sendMessage() {
    this.snackbar.openSnackBar("Your message has been sent!")
  }

  revertChanges() {
    this.editProfile.get("displayname").setValue(this.prevDisplayName);
  } 

  notifySave() {
    let user = this.tokenService.getUser();
    user.commentNotifications = this.commentsChecked;
    user.likeNotifications = this.likesChecked;
    user.newFollowerNotifications = this.followersChecked;
    user.recipeSavedNotifications = this.recipeChecked;
    this.http.put(this.UPDATE_URL, user).subscribe(
      (res: any) => {
        this.snackbar.openSnackBar("Your changes have been saved!")
        this.tokenService.saveUser(res);
      }
    );
  }

  changeAvatar(){
    this.snackbar.openSnackBar("Coming soon!");
  }

  openTermsDialog() {
    const dialogRef = this.dialog.open(TermsComponent);
  }

  openPrivacyDialog() {
    const dialogRef = this.dialog.open(PrivacyPolicyComponent);
  }
}
