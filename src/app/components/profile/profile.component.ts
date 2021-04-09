import { Component, OnInit } from '@angular/core';
import { RECIPES } from 'src/app/helpers/sample-data';
import { MatDialog } from '@angular/material/dialog';
import { CollectionsComponent } from 'src/app/components/create-collections/create-collections.component';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  collections = CollectionsComponent;
  sample_recipes = RECIPES;

  constructor(public dialog:MatDialog) { }

  openDialog(comp){
    this.dialog.open(comp);
  }
  ngOnInit(): void {
  }

}
