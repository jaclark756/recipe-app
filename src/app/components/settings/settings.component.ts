import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
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

      // add functionality to update new display name

      alert("Your changes have been saved!")
    }
    else {
      alert("ERROR: There are no changes to be saved");
    }
  }

  revertChanges() {
    this.editProfile.reset();  //not working.....
  } 

  notifySave() {
    let object = {
      "commentsChecked": this.commentsChecked,
      "followersChecked": this.followersChecked,
      "likesChecked": this.likesChecked,
      "recipeChecked": this.recipeChecked
    }
  }
}
