import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FabComponent } from './components/fab/fab.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';



@NgModule({
  declarations: [HeaderComponent, FabComponent, SnackbarComponent],
  imports: [
    CommonModule
  ], 
  exports: [
    
  ]
})
export class SharedModule { }
