import { Component, Input, OnInit } from '@angular/core';
import { Collection } from 'src/app/types/collection';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-collection-dialog',
  templateUrl: './collection-dialog.component.html',
  styleUrls: ['./collection-dialog.component.scss']
})
export class CollectionDialogComponent implements OnInit {

  @Input() collection:Collection;

  constructor(public snackbar: SnackbarService) { }

  ngOnInit(): void {
  }

  saveRecipe() {
    this.snackbar.openSnackBar(`Recipe has been saved to ${this.collection.collectionName}`)
    }
}
