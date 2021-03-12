import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InputRecipeComponent } from './components/input-recipe/input-recipe.component';
import { ViewRecipesComponent } from './components/view-recipes/view-recipes.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    InputRecipeComponent,
    ViewRecipesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    RouterModule.forRoot([
      {path: '', component: InputRecipeComponent},
      {path: 'inputrecipe', component: InputRecipeComponent},
      {path: 'viewrecpie', component: ViewRecipesComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
