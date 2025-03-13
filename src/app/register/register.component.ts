import { Component } from '@angular/core';
import {UserService} from '../user.service';
import {Router} from '@angular/router';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) {}

  passRepeat: any;

  register(user: any) {
    if (user.pass == this.passRepeat) {
      (<HTMLInputElement>document.getElementById("message")).innerHTML = "";
      user.role = 'user';
      user.pass = crypto.SHA256(user.pass).toString();
      this.userService.postUser(user);
      alert("User registered");
      this.router.navigate(['/login']);
    }
    else {
      (<HTMLInputElement>document.getElementById("message")).innerHTML = "Passwords don't match!";
    }
  }
}
