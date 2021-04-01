import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { User } from 'src/app/types/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  panelOpenState = false;
  activeUser: User;
  commentsChecked = true;
  followersChecked = true;
  likesChecked = true;
  recipeChecked = true;
  editProfile: FormGroup;
  
  constructor(
    public fb: FormBuilder,
    public snackbar: SnackbarService,
    public userService: UserService) {
      userService.getCurrentUser().subscribe((user: any) => this.activeUser = user);
      this.editProfile = this.fb.group({
        displayname: new FormControl('Test Name', [Validators.required, Validators.minLength(3), Validators.maxLength(50)])
      })
     }

  ngOnInit(): void {
  }

  updateProfile() {
    if (this.editProfile.valid && this.editProfile.dirty) {
      this.snackbar.openSnackBar("Your changes have been saved!")
      // add functionality to update new display name

    }
    else {
      this.snackbar.openSnackBar("ERROR: There are no changes to be saved");
    }
  }

  revertChanges() {
    this.editProfile.get("displayname").setValue("Test Name")
  } 

  notifySave() {
    // TODO: add logic to backend to store user's notifications settings
    // TODO: post settings to the backend
    let object = {
      "commentsChecked": this.commentsChecked,
      "followersChecked": this.followersChecked,
      "likesChecked": this.likesChecked,
      "recipeChecked": this.recipeChecked
    }
  }
}
