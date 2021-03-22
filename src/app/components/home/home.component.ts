import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
   
  categories = [
  {
    name: "desserts",
    photoURL: "/assets/images/7e68c11e4a2fe69d8112675ab5211d94.jpg"
 },
 {
   name: "vegan",
   photoURL: "/assets/images/a2c4f9a2cda860eee0caa635831a69bd.jpg"
 }
]
  constructor() { }

  ngOnInit(): void {
  }

}
