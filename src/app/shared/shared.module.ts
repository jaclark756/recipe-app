import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCardTileComponent } from './components/recipe-card-tile/recipe-card-tile.component';
import { HeaderComponent } from './components/header/header.component';
import { FabComponent } from './components/fab/fab.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarService } from './services/snackbar.service';



@NgModule({
  declarations: [
    HeaderComponent, 
    FabComponent, 
    RecipeCardTileComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule
  ], 
  exports: [
    
  ],
  providers: [
    SnackbarService
  ]
})
export class SharedModule { }
