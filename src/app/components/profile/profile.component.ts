import { Component } from '@angular/core';
import { RECIPES } from 'src/app/helpers/sample-data';
import { MatDialog } from '@angular/material/dialog';
import { Collection } from 'src/app/types/collection';
import { CreateCollectionsComponent } from '../create-collections/create-collections.component';
import { CollectionService } from 'src/app/services/collections.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

export class ProfileComponent {

  createCollection = CreateCollectionsComponent;
  collection: Collection;
  sample_recipes = RECIPES;
  activeUser: User;
  collectionRecipes: boolean = false;
  collectionList: boolean = true;


  constructor(
    public tokenService: TokenService,
    public userService: UserService,
    public dialog:MatDialog,
    public collectionService: CollectionService
  ) { 
    this.activeUser = this.tokenService.getUser();
  }



  openCreateCollectionDialog(){
    const dialogRef = this.dialog.open(CreateCollectionsComponent);
  }

  viewCollectionRecipes(collection: Collection){
    this.collection = collection;
    this.collectionRecipes = !this.collectionRecipes;
    this.collectionList = !this.collectionList;
  }

  viewCollectionList(){
    this.collection = null;
    this.collectionRecipes = !this.collectionRecipes;
    this.collectionList = !this.collectionList;
  }


}
