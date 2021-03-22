import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   
categories = [
  {
    name: 'desserts',
    photoURL: 'somePhotoUrl'
 },
 {
   name: 'vegan',
   photoURL: 'somePhotoUrl'
 }
]
  constructor() { }

  ngOnInit(): void {
  }

}
