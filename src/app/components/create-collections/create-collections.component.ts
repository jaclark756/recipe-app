import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';
import { CollectionService } from 'src/app/services/collections.service';
import { Collection } from 'src/app/types/collection';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/types/user';
import { UserService } from 'src/app/services/user.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Component({
  selector: 'app-create-collections',
  templateUrl: './create-collections.component.html',
  styleUrls: ['./create-collections.component.scss']
})
export class CreateCollectionsComponent implements OnInit {

  private readonly collectionSubject = new BehaviorSubject<Collection[]>([]);
  readonly collection$ = this.collectionSubject.asObservable();
  activeUser: User;
  newCollectionForm: FormGroup;

  constructor(
    private http: HttpClient,
    public fb: FormBuilder,
    public validationService: ValidationService,
    public collectionService: CollectionService,
    public userService: UserService
  ) {
    this.newCollectionForm = fb.group({
      collectionName: new FormControl('', [Validators.required], this.validationService.userNameValidator.bind(this.validationService))
    })
    this.userService.getCurrentUser().subscribe((user:User) => this.activeUser = user)
  }

  //   help here
  //   private baseUrl: string = this.environment.getValue('apiUrl');
  //   private url: string = this.baseUrl +"/profile/collections"

  ngOnInit(): void {
  }


  get collection(): Collection[] {
    return this.collectionSubject.getValue();
  }

  set collection(collection: Collection[]) {
    this.collectionSubject.next(collection);
  }
  addCollection() {
    console.log(this.activeUser)
    if (this.newCollectionForm.valid){
      this.collectionService.addCollection({
        id: null,
        collectionName: this.newCollectionForm.get("collectionName").value,
        recipeList: null,
        imageUrl: null,
        userId: +this.activeUser.id,

      });
      this.newCollectionForm.reset();
    }
  }


}
