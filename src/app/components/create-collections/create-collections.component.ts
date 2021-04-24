import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
import { CollectionService } from 'src/app/services/collections.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-collections',
  templateUrl: './create-collections.component.html',
  styleUrls: ['./create-collections.component.scss']
})
export class CreateCollectionsComponent implements OnInit {

  newCollectionForm: FormGroup;
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  collectionName: string;

  constructor(
    public fb: FormBuilder,
    public validationService: ValidationService,
    public collectionService: CollectionService,
    private dr: MatDialogRef<CreateCollectionsComponent>,
    private _snackBar: MatSnackBar
  ) {
    this.newCollectionForm = fb.group({
      collectionName: new FormControl('', [Validators.required], this.validationService.userNameValidator.bind(this.validationService))
    })
  }

  ngOnInit(): void {
  }

  addCollection(message: string) {
    let collectionName = this.newCollectionForm.get("collectionName").value;
    let lilSnackMessage = 'Collection "' + collectionName + '" has been created!'
    this._snackBar.open(lilSnackMessage, "", {
      duration: 2000,
      verticalPosition: this.verticalPosition,
      panelClass: ["custom-style"]
    });
    this.dr.close()
  }

}
