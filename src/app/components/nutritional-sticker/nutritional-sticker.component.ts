import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NUTRIENTS } from '../../helpers/sample-data';
import { RecipeService } from '../../services/recipe.service';
import { Nutrient } from '../../types/nutrient';
import { NutrientEntity } from '../../types/NutrientEntity';

@Component({
  selector: 'app-nutritional-sticker',
  templateUrl: './nutritional-sticker.component.html',
  styleUrls: ['./nutritional-sticker.component.scss']
})
export class NutritionalStickerComponent implements OnInit {

  public combinedNutrients: Nutrient[];
  public nutrition = NUTRIENTS as NutrientEntity[];
  public calories:Nutrient;
  public fat:Nutrient;
  public sodium:Nutrient;
  public carbs:Nutrient;
  public fiber:Nutrient;
  public sugar:Nutrient;
  public protein:Nutrient;

  constructor(public recipeService: RecipeService,private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(param => {
      console.log(param.get('id'));
      if (param.get('id')) {
        this.recipeService.getRecipe(+param.get('id')).subscribe(recipe => {
          // this.recipeService.getNutritionalInfo(+param.get('id')).subscribe(nutrition => {
          //   this.nutrition = nutrition as NutrientEntity[];
          // });
          this.combinedNutrients = this.recipeService.filterNutrition(this.nutrition);
          this.separateNutrients()
        })
      };
    })    
  }

  separateNutrients(){
    this.combinedNutrients.forEach(nutrient=>{
      if(nutrient.name.toLowerCase()==="calories")
        {this.calories=nutrient}
      if(nutrient.name.toLowerCase()==="fat")
        {this.fat=nutrient}
      if(nutrient.name.toLowerCase()==="Carbohydrates")
        {this.carbs=nutrient}
      if(nutrient.name.toLowerCase()==="sodium")
        {this.sodium=nutrient}
      if(nutrient.name.toLowerCase()==="sugar")
        {this.sugar=nutrient}
      if(nutrient.name.toLowerCase()==="protein")
        {this.protein=nutrient}
      if(nutrient.name.toLowerCase()==="fiber")
        {this.fiber=nutrient}
    })
  }
}
