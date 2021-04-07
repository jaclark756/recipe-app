import { Component, OnInit } from '@angular/core';
import { RECIPES } from 'src/app/helpers/sample-data';
import { InputRecipeComponent } from 'src/app/components/input-recipe/input-recipe.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  sample_recipes = RECIPES;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
}
