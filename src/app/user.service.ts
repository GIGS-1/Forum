import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get('https://labosbaza-default-rtdb.europe-west1.firebasedatabase.app/users.json')
  }

  getUserById(id: any) {
    return this.http.get(`https://labosbaza-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`)
  }

  postUser(user: any) {
    console.log(user);
    return this.http.post('https://labosbaza-default-rtdb.europe-west1.firebasedatabase.app/users.json', user).subscribe(responseData => {
      console.log(responseData);
    });
  }

}

export interface User {
  username: string;
  pass: string;
  name: string;
  eMail: string;
  role: string;
}
