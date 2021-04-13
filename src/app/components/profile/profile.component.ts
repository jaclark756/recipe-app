import { Component, OnInit } from '@angular/core';
import { RECIPES } from 'src/app/helpers/sample-data';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/user';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  activeUser: User;
  sample_recipes = RECIPES;

  constructor(
    public tokenService: TokenService,
    public userService: UserService
  ) { 
    this.activeUser = this.tokenService.getUser();
  }

  ngOnInit(): void {
  }

}
