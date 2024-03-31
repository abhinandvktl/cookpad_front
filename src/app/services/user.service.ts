import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // for logging

  existingUser: any;

  constructor() { }

  setLoggedInUser(user: any) {
    this.existingUser = user;
  }

  getLoggedInUser() {
    return this.existingUser;
  }

  // for logout
  logout() {
    this.existingUser = null;
    sessionStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('token');
  }
  
}
