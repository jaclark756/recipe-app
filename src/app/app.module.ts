import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { InputRecipeComponent } from './components/input-recipe/input-recipe.component';
import { ViewRecipesComponent } from './components/view-recipes/view-recipes.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';


const routes: Routes = [
  {path: 'login', component: LoginComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    EditProfileComponent,
    InputRecipeComponent,
    ViewRecipesComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    FormsModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCardModule,
    MatInputModule,


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
