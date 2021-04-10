import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
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
  editProfile: FormGroup;

  SIGNUP_URL: string = "/v2/user/update"
  UPDATE_URL = environment.apiUrl + this.SIGNUP_URL;
  
  constructor(
    public fb: FormBuilder,
    public snackbar: SnackbarService,
    public tokenService: TokenService,
    public userService: UserService,
    public http: HttpClient
  ) {
      this.activeUser = this.tokenService.getUser();
      this.commentsChecked = this.activeUser.commentNotifications;
      this.likesChecked = this.activeUser.likeNotifications
      this.followersChecked = this.activeUser.newFollowerNotifications;
      this.recipeChecked = this.activeUser.recipeSavedNotifications;
      this.editProfile = this.fb.group({
        // TODO: set default value to the activeUser's displayname
        displayname: new FormControl(this.activeUser.displayName ,[Validators.required, Validators.minLength(3), Validators.maxLength(50)])
      })
     }

  ngOnInit(): void {
  }

  updateProfile() {
    if (this.editProfile.valid && this.editProfile.dirty) {

      // TODO: for jackie. Get user object from token storage. Change the displayName to new value. Send to API.
      let user = this.tokenService.getUser();
      user.displayName = this.editProfile.get("displayname").value;
      this.http.put(this.UPDATE_URL, user).subscribe(
        (res: any) => {
          // TODO: move snackbar inside the callback of the post request
          this.snackbar.openSnackBar("Your changes have been saved!")
          this.tokenService.saveUser(res);
        }
      );
    }
    else {
      this.snackbar.openSnackBar("ERROR: There are no changes to be saved");
    }
  }

  revertChanges() {
    this.editProfile.get("displayname").setValue("Test Name")
  } 

  notifySave() {
    //TODO: same as the update profile. get user. change these settings for user object. send to api.
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
}
