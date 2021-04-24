import { Component, OnInit } from '@angular/core';
import { RECIPES } from 'src/app/helpers/sample-data';
import { MatDialog } from '@angular/material/dialog';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';
import { CreateCollectionsComponent } from '../create-collections/create-collections.component';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {

  activeUser: User;
  sample_recipes = RECIPES;

  constructor(
    public tokenService: TokenService,
    public userService: UserService,
    public dialog:MatDialog
  ) { 
    this.activeUser = this.tokenService.getUser();
  }

  openCreateCollectionDialog(){
    const dialogRef = this.dialog.open(CreateCollectionsComponent);
  }
  ngOnInit(): void {
  }

}
