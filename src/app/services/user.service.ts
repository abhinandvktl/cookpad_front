import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  existingUser: any;

  constructor() { }

  setLoggedInUser(user: any) {
    this.existingUser = user;
  }

  getLoggedInUser() {
    return this.existingUser;
  }
  
}
