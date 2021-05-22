import { Component } from '@angular/core';
import { RECIPES } from 'src/app/helpers/sample-data';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Collection } from 'src/app/types/collection';
import { CreateCollectionsComponent } from '../create-collections/create-collections.component';
import { CollectionService } from 'src/app/services/collections.service';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';
import { InputRecipeComponent } from '../input-recipe/input-recipe.component';
import { Recipe } from 'src/app/types/recipe';
import { RecipeService } from 'src/app/services/recipe.service';
import { HttpParams } from '@angular/common/http';



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
  userRecipes: Recipe[];
  httpParams: HttpParams = new HttpParams();


  constructor(
    public tokenService: TokenService,
    public userService: UserService,
    public dialog:MatDialog,
    public collectionService: CollectionService,
    public recipeService: RecipeService
  ) { 
    this.activeUser = this.tokenService.getUser();
  }

  ngOnInit(): void {
    this.recipeService.findRecipesByUser(this.httpParams.set("user", this.activeUser.id.toString()))
    .subscribe(response => {
      this.userRecipes = response})
  }

  addRecipe() {
    const config = new MatDialogConfig();
    config.autoFocus = true;
    config.disableClose = false;
    config.panelClass = 'dialog-container';
    const dr = this.dialog.open(InputRecipeComponent, config);
  }



  openCreateCollectionDialog(){
    const dialogRef = this.dialog.open(CreateCollectionsComponent);
  }

  viewCollectionRecipes(collection: Collection){
    console.log("collection recipes",collection.recipeList)
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
