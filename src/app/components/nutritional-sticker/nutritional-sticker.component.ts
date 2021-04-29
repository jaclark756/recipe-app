import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NUTRIENTS } from 'src/app/helpers/sample-data';
import { RecipeService } from 'src/app/services/recipe.service';
import { Nutrient } from 'src/app/types/nutrient';
import { NutrientEntity } from 'src/app/types/NutrientEntity';

@Component({
  selector: 'app-nutritional-sticker',
  templateUrl: './nutritional-sticker.component.html',
  styleUrls: ['./nutritional-sticker.component.scss']
})
export class NutritionalStickerComponent implements OnInit {

  public combinedNutrients: Nutrient[];
  public nutrition = NUTRIENTS as NutrientEntity[];

  constructor(public recipeService: RecipeService,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(param => {
      console.log(param.get('id'));
      if (param.get('id')) {
        this.recipeService.getRecipe(+param.get('id')).subscribe(recipe => {
          this.recipeService.getNutritionalInfo(+param.get('id')).subscribe(nutrition => {
            this.nutrition = nutrition as NutrientEntity[];
          });
          this.combinedNutrients = this.recipeService.filterNutrition(this.nutrition);
        })
      };
    })
  }
}
