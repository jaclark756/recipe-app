import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/types/recipe';

@Component({
  selector: 'app-recipe-card-tile',
  templateUrl: './recipe-card-tile.component.html',
  styleUrls: ['./recipe-card-tile.component.scss']
})
export class RecipeCardTileComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

}
