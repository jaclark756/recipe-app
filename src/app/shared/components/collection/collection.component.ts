import { Component, OnInit } from '@angular/core';
import { RECIPES } from 'src/app/helpers/sample-data';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  sample_recipes = RECIPES;
  constructor() { }

  ngOnInit(): void {
  }

}
