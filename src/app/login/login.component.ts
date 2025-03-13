import { Component } from '@angular/core';
import {User, UserService} from '../user.service';
import {Router} from '@angular/router';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  data: any;
  users: User[] = [];
  keys: string[] = [];

  logIn(user: User) {
    (<HTMLInputElement>document.getElementById("message")).innerHTML = "";

    this.userService.getUsers().subscribe(data => {
      this.users = Object.values(data);
      this.keys = Object.keys(data);

      let checkUser = false;
      let checkPass = false;

      for(let i = 0; i < this.users.length; i++) {
        if (this.users[i].username == user.username) {
          checkUser = true;
          if (this.users[i].pass == crypto.SHA256(user.pass).toString()) {
            checkPass = true;
            sessionStorage.setItem('username', this.users[i].username);
            sessionStorage.setItem('userId', this.keys[i]);
            this.router.navigate(['/']);
          }
        }
      }

      if (!checkUser) {
        (<HTMLInputElement>document.getElementById("message")).innerHTML = "User with username " + user.username + "  doesn't exist!";
      }
      else {
        (<HTMLInputElement>document.getElementById("message")).innerHTML = "Password is incorrect!";
      }
    })
  }
}
