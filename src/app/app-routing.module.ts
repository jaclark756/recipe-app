import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { WelcomeComponent } from './components/welcome/welcome.component';
import { InputRecipeComponent } from './components/input-recipe/input-recipe.component';
import { ViewRecipesComponent } from './components/view-recipes/view-recipes.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'login', component: WelcomeComponent },
  { path: 'register', component: RegisterComponent},
  { path: '', component: WelcomeComponent },
  { path: 'inputrecipe', component: InputRecipeComponent },
  { path: 'viewrecipe/:id', component: ViewRecipesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
