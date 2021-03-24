import { Component, OnInit } from '@angular/core';
import { RECIPES } from 'src/app/helpers/sample-data';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  sample_recipes = RECIPES;

  constructor() { }

  ngOnInit(): void {
  }

}
