import { Component, OnInit } from '@angular/core';
import { RECIPES } from 'src/app/helpers/sample-data';
import { MatDialog } from '@angular/material/dialog';
import { Collection } from 'src/app/types/collection';
import { CreateCollectionsComponent } from '../create-collections/create-collections.component';
import { CollectionService } from 'src/app/services/collections.service';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  createCollection = CreateCollectionsComponent;
  public collections: Collection[];
  sample_recipes = RECIPES;

  constructor(public dialog:MatDialog, public collectionService: CollectionService) { }

  openDialog(comp){
    this.dialog.open(comp);
  }
  ngOnInit(): void {
    this.collectionService.getCollectionsByUser(1).subscribe(response => {this.collections=response});
  }

}
