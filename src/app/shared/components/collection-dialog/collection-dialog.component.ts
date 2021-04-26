import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CreateCollectionsComponent } from 'src/app/components/create-collections/create-collections.component';
import { Collection } from 'src/app/types/collection';


@Component({
  selector: 'app-collection-dialog',
  templateUrl: './collection-dialog.component.html',
  styleUrls: ['./collection-dialog.component.scss']
})
export class CollectionDialogComponent implements OnInit {

  @Input() collection:Collection;

  verticalPosition: MatSnackBarVerticalPosition = 'top';
  collections = [
    'Breakfast',
    'Brunch Ideas',
    'Quick Dinner Ideas',
    'Vegan Recipes',
    'Gluten Free Bread',
    'Healthy Smoothies',
    'Kid Friendly Meals',
    'Fatty Desserts',
    'Crockpot Soup Recipes',
    'Thanksgiving Meals to try',
    'Checking Recipes',
    '30 day cleanse recipes',
    'Healthy Meal Prep Recipes'
  ];

  constructor(
    public dialog:MatDialog,
    private dr: MatDialogRef<CreateCollectionsComponent>,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  saveRecipe() {

   // TODO: add function to save recipe to selected collection(s)
   
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
