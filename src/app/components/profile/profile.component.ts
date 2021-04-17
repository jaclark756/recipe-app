import { Component, OnInit } from '@angular/core';
import { RECIPES } from 'src/app/helpers/sample-data';
import { MatDialog } from '@angular/material/dialog';
import { CollectionsComponent } from 'src/app/components/create-collections/create-collections.component';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  collections = CollectionsComponent;
  activeUser: User;
  sample_recipes = RECIPES;

  constructor(
    public tokenService: TokenService,
    public userService: UserService,
    public dialog:MatDialog
  ) { 
    this.activeUser = this.tokenService.getUser();
  }

  openDialog(comp){
    this.dialog.open(comp);
  }
  ngOnInit(): void {
  }

}
