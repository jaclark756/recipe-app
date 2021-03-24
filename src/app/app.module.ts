import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

import { AppComponent } from './app.component';
import { InputRecipeComponent } from './components/input-recipe/input-recipe.component';
import { ViewRecipesComponent } from './components/view-recipes/view-recipes.component';
import { LoginComponent } from './components/login/login.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { HomeComponent } from './components/home/home.component';
import { SettingsComponent } from './components/settings/settings.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    EditProfileComponent,
    InputRecipeComponent,
    ViewRecipesComponent,
    CollectionsComponent,
    RegisterComponent,
    WelcomeComponent,
    HomeComponent,
    SettingsComponent
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatInputModule
  ],

  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
