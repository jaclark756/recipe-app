import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string) {
    let lilSnackMessage = message + " copied to clipboard!"
    this._snackBar.open(lilSnackMessage, "", {
      duration: 2000,
      verticalPosition: this.verticalPosition,
      panelClass: ["custom-style"]
    });
  }

  ngOnInit(): void {
  }

}
