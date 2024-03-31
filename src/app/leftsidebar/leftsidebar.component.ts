import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-leftsidebar',
  templateUrl: './leftsidebar.component.html',
  styleUrls: ['./leftsidebar.component.css']
})
export class LeftsidebarComponent implements OnInit {

  // Define loggedInUser variable
  existingUser: any;
  loggeduserdetails:any;

  

  constructor(private userService:UserService){}
  

  ngOnInit(): void {
    const loggedInUserString = sessionStorage.getItem("loggedInUser");
    console.log(loggedInUserString);
    
    if (loggedInUserString !== null) {
        this.loggeduserdetails = JSON.parse(loggedInUserString);



        // console.log(this.loggeduserdetails);
        
        // Now you can use loggeduserdetails
    } else {
        // Handle the case where "loggedInUser" is not set in sessionStorage
    }
  }

}
