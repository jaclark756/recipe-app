import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { InputRecipeComponent } from './components/input-recipe/input-recipe.component';
import { ViewRecipesComponent } from './components/view-recipes/view-recipes.component';

const routes: Routes = [
  { path: '/login', component: WelcomeComponent },
  { path: '', component: InputRecipeComponent },
  { path: 'inputrecipe', component: InputRecipeComponent },
  { path: 'viewrecipe/:id', component: ViewRecipesComponent }
];

@NgModule({
  imports: [RouterModule,],
  exports: [RouterModule]
})
export class AppRoutingModule { }
