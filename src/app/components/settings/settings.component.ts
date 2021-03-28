import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  profileSettings: FormGroup;
  
  constructor(
    public fb: FormBuilder,
    public userService: UserService) {
      userService.getCurrentUser().subscribe((user: any) => this.activeUser = user);
      this.profileSettings = this.fb.group({
        displayName: ['', Validators.required]
      })
     }

  ngOnInit(): void {
  }

  saveProfileInfo() {
    
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
