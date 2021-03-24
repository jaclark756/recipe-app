import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {

  categories = [
    {
      name: "desserts",
      photoURL: "/assets/images/4c93860a6c3ae62fad2d442f5a9a430d.jpg"
   },
   {
     name: "vegan",
     photoURL: "/assets/images/7ca6646093c7a90b0996d2ac084384a1.jpg"
   },
   {
    name: "brunch",
    photoURL: "/assets/images/8e58c699fed88d7f76df8e36c55ece53.jpg"
  },
  {
    name: "pasta",
    photoURL: "/assets/images/b727c4d62e6a63025ee7bfbc84f93f1d.jpg"
  }
  
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
