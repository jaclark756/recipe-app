import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { WelcomeComponent } from './components/welcome/welcome.component';
import { InputRecipeComponent } from './components/input-recipe/input-recipe.component';
import { ViewRecipesComponent } from './components/view-recipes/view-recipes.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CategoryCardComponent } from './shared/components/category-card/category-card.component';
import { RouterGuard } from './guards/router.guard';
import { TokenService } from './services/token.service';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [RouterGuard] },
  { path: 'home', component: HomeComponent, canActivate: [RouterGuard] },
  { path: 'login', component: WelcomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [RouterGuard] },
  { path: 'inputrecipe', component: InputRecipeComponent, canActivate: [RouterGuard] },
  { path: 'viewrecipe/:id', component: ViewRecipesComponent, canActivate: [RouterGuard] },
  { path: 'category', component: CategoryCardComponent },
  { path: '**', component: ViewRecipesComponent, canActivate: [RouterGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [TokenService]
})
export class AppRoutingModule { }
