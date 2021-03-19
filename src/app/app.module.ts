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
import { CollectionsComponent } from './components/collections/collections.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';


const routes: Routes = [
  { path: 'login', component: WelcomeComponent }

]
@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ProfileComponent,
    EditProfileComponent,
    InputRecipeComponent,
    ViewRecipesComponent,
    CollectionsComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    MatDialogModule,
    MatCardModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCardModule,
    MatGridListModule,
    SharedModule,
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
