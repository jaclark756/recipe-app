import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  api: string = "http://localhost:8080/login"
  response: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.get(this.api).subscribe((res) => {
      console.log(res)
    })
  }

  get(endPoint: string): any{
    return this.http.get(endPoint);
  }


}
