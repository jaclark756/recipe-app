import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/types/recipe';
import { TooltipPosition } from '@angular/material/tooltip';


@Component({
  selector: 'app-collection-card',
  templateUrl: './collection-card.component.html',
  styleUrls: ['./collection-card.component.scss']
})
export class CollectionCardComponent implements OnInit {

  @Input() recipe: Recipe;

  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
 
  
  constructor() { }

  ngOnInit(): void {
  }

}
