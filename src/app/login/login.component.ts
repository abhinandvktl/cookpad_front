import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  profileuser:any=''

  loginForm = this.fb.group({

    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]]

  })


  

  constructor(private fb: FormBuilder,private api:ApiService,private route:Router, private userService: UserService) { }

  login() {
    if (this.loginForm.valid) {

      const email = this.loginForm.value.email
      const password = this.loginForm.value.password

      console.log(`${email} ${password}`);

      const reqBody={email,password}

      // api call
      this.api.loginApi(reqBody).subscribe({
        next:(res:any)=>{
          console.log(res);          

          this.userService.setLoggedInUser(res.existingUser)
          console.log(res.existingUser);
          

          sessionStorage.setItem("loggedInUser",JSON.stringify(res.existingUser))
          
          sessionStorage.setItem("token",res.token)
          console.log(res.token);
          
          
          this.route.navigateByUrl('/home')
        },
        error:(err:any)=>{
          console.log(err);
        }
      })
      
    }
    else{
      alert('Invalid form')
    }
  }

}
