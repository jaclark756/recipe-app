import { formatCurrency } from '@angular/common';
import { Inject } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CreateCollectionsComponent } from 'src/app/components/create-collections/create-collections.component';
import { CollectionService } from 'src/app/services/collections.service';
import { TokenService } from 'src/app/services/token.service';
import { ValidationService } from 'src/app/services/validation.service';
import { Collection } from 'src/app/types/collection';
import { Recipe } from 'src/app/types/recipe';
import { User } from 'src/app/types/user';


@Component({
  selector: 'app-collection-dialog',
  templateUrl: './collection-dialog.component.html',
  styleUrls: ['./collection-dialog.component.scss']
})
export class CollectionDialogComponent implements OnInit {

  @Input() collection: Collection;
  recipe: Recipe;
  public collections: Collection[];
  activeUser: User;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  newSaveRecipeForm: FormArray;
  

  constructor(
    public dialog:MatDialog,
    public fb: FormBuilder,
    public validationService: ValidationService,
    public tokenService: TokenService,
    public collectionService: CollectionService,
    private dr: MatDialogRef<CreateCollectionsComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
      this.newSaveRecipeForm= new FormArray([])
      this.activeUser = this.tokenService.getUser();
      this.recipe = data.recipe;
    }

  ngOnInit(): void {
    this.populate()
  }

  populate() {
    this.collectionService.getCollectionsByUser(this.activeUser.id).subscribe(response => {
      this.collections = response
      this.collections.forEach(collection => {
        this.newSaveRecipeForm.push(new FormControl(false))
      })
    });
    this.collectionService.collection$.subscribe(res => {
      this.collections = res      
      this.collections.forEach(collection => {
        this.newSaveRecipeForm.push(new FormControl(false))
      })}
    )
  }

  saveRecipe(message: string) {
    this.newSaveRecipeForm.value.forEach((element,i) => {
      if(element){
        this.collectionService.saveRecipe2Collection(this.collections[i].id,this.recipe)
      }
    });
    let lilSnackMessage = 'Recipe has been saved!' 
    this._snackBar.open(lilSnackMessage, "", {
      duration: 2000,
      verticalPosition: this.verticalPosition,
      panelClass: ["custom-style"]
    });
    this.dr.close()
    }

    openCreateCollectionDialog(){
      const dialogRef = this.dialog.open(CreateCollectionsComponent);
      
    }


}

