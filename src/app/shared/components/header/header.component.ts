import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  opened=false;

  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {
  }
  
  openSearchDialog() {
    const dialogRef = this.dialog.open(SearchDialogComponent);
  }

  menuOpened(){ this.opened = true}
  menuClosed(){ this.opened = false}
 
}
