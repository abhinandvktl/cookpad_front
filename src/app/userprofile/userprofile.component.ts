import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  loggeduserdetails:any;


  constructor (private userService:UserService){}

  ngOnInit(): void {
    const loggedInUserString = sessionStorage.getItem("loggedInUser");
    console.log(loggedInUserString);
    
    if (loggedInUserString !== null) {
        this.loggeduserdetails = JSON.parse(loggedInUserString);



        console.log(this.loggeduserdetails);
        
        // Now you can use loggeduserdetails
    } else {
        // Handle the case where "loggedInUser" is not set in sessionStorage
    }
  }

}
