import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { InputRecipeComponent } from './components/input-recipe/input-recipe.component';
import { ViewRecipesComponent } from './components/view-recipes/view-recipes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './components/login/login.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { WelcomeComponent } from './components/welcome/welcome.component';
import {MatGridListModule} from '@angular/material/grid-list';





const routes: Routes = [
  // {path: 'welcome', component: WelcomeComponent},
  {path: 'login', component: WelcomeComponent}
  
]
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    InputRecipeComponent,
    ViewRecipesComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatDialogModule,
    MatCardModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,


    RouterModule.forRoot([
      {path: '', component: InputRecipeComponent},
      {path: 'inputrecipe', component: InputRecipeComponent},
      {path: 'viewrecpie/:id', component: ViewRecipesComponent}
    ])

  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
