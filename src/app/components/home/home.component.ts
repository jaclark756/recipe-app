import { Component, OnInit } from '@angular/core';
import { RECIPES } from 'src/app/helpers/sample-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sample_recipes = RECIPES;

  constructor() { }

  ngOnInit(): void {
  }

}
