import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
import { CollectionService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-collections',
  templateUrl: './create-collections.component.html',
  styleUrls: ['./create-collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  newCollectionForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public validationService: ValidationService,
    public collectionService: CollectionService,
  ) { 
    this.newCollectionForm = fb.group({
      collectionName: new FormControl('', [Validators.required], this.validationService.userNameValidator.bind(this.validationService))
    })
  }

  ngOnInit(): void {
  }

addCollection(){
  this.collectionService.addCollection({
    collectionName: this.newCollectionForm.get("collectionName").value
  })
}

}
