import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  @ViewChild('fileInput')
  fileInput!: ElementRef;

  onFileSelected(event: any, userpost: any): void {
    const file = event.target.files[0];
    this.postDetails = file;
  }

  onFileSelectedprofile(event: any): void {
    const file = event.target.files[0];
    this.postDetailsprofile.image = file;
  }

  postDetailsprofile = { recipename: '', description: '', image: '' }
  
  loggeduserdetails: any;

  token: string = ''

  userposts: any = []

  SERVER_URL = 'http://localhost:3000'
  
  username: any = ''



  postDetails : any =''




  constructor(private userService: UserService, private api: ApiService, private http: HttpClient) { }



  ngOnInit(): void {

    const storedToken = sessionStorage.getItem('token')
    this.token = storedToken ? storedToken : '';

    const loggedInUserString = sessionStorage.getItem("loggedInUser");
    console.log(loggedInUserString);

    if (loggedInUserString !== null) {
      this.loggeduserdetails = JSON.parse(loggedInUserString);
      console.log(this.loggeduserdetails);

      // Now you can use loggeduserdetails
    } else {
      // Handle the case where "loggedInUser" is not set in sessionStorage
    }

    this.getUserallPosts()
  }


  // getuserposts
  getUserallPosts(): void {
    const reqHeader = new HttpHeaders().set("Authorization", `Bearer ${this.token}`)

    this.api.getUserPosts(reqHeader).subscribe({
      next: (res: any) => {
        console.log(res);
        this.userposts = res

        this.userposts.reverse()
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }

  // user edit
  editUserinfo() {

    if (!this.username) {
      alert('Username is required.');
    }

    const reqBody = {
      username: this.username
    }

    const reqHeader = new HttpHeaders().set("Authorization", `Bearer ${this.token}`)

    this.api.editUser(reqBody, reqHeader).subscribe({
      next: (res: any) => {
        console.log(res);
        // Update the username in loggeduserdetails
        this.loggeduserdetails.username = this.username
        // Update sessionStorage
        sessionStorage.setItem("loggedInUser", JSON.stringify(this.loggeduserdetails))
        alert('updated')

      },
      error: (err: any) => {
        console.log(err);
        alert(err)
      }
    })
  }




  // edit post
  handleupdate(form: NgForm, userpost: any): void {

   
    
    if (!form.valid) {
        alert('Please fill the form completely');
    } else {
        const reqBody = new FormData();
        reqBody.append('recipename', userpost.recipename);
        reqBody.append('description', userpost.description);
        reqBody.append('image', this.postDetails); // Assuming image is part of userpost
        console.log(userpost._id);
        

        const reqHeader = new HttpHeaders().set("Authorization", `Barear ${this.token}`)
        

        this.api.editPost(userpost._id, reqBody, reqHeader).subscribe({
            next: (result: any) => {
                if (result.status === 200) {
                    // Update user interface as needed
                    alert('Updated Post.');
                    // Optionally close modal or do any other action needed
                } else {
                    alert(result);
                }
            },
            error: (error: any) => {
                console.error(error);
                alert('An error occurred while updating the post.');
            }
        });
    }
}

  // delete post
  deletepost(_id:any){

    const reqHeader = new HttpHeaders().set("Authorization", `Bearer ${this.token}`)

    this.api.deletepost(_id,reqHeader).subscribe({
      next: (res: any) => {
        console.log(res);
        alert('post deleted successfully')
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }


  // handleAddPost(form: NgForm): void {
  //   if (!form.valid) {
  //     alert("please fill the form")
  //   } else {
  //     const reqBody = new FormData();
  //     reqBody.append("recipename", this.postDetails.recipename)
  //     reqBody.append("description", this.postDetails.description)
  //     reqBody.append("image", this.postDetails.image)


  //     const reqHeader = new HttpHeaders().set("Authorization", `Barear ${this.token}`)

  //     // add post
  //     this.api.addPost(reqBody, reqHeader).subscribe({
  //       next: (res: any) => {
  //         console.log(res);
  //         alert('Posting...')

  //       },
  //       error: (err: any) => {
  //         console.log(err);
  //         alert(err)
  //       }
  //     })
  //   }

  // }



  handleAddPost(form: NgForm): void {
    if (!form.valid) {
      alert("please fill the form")
    } else {
      const reqBody = new FormData();
      reqBody.append("recipename", this.postDetailsprofile.recipename)
      reqBody.append("description", this.postDetailsprofile.description)
      reqBody.append("image", this.postDetailsprofile.image)


      const reqHeader = new HttpHeaders().set("Authorization", `Barear ${this.token}`)

      // add post
      this.api.addPost(reqBody, reqHeader).subscribe({
        next: (res: any) => {
          console.log(res);
          alert('Posting...')

        },
        error: (err: any) => {
          console.log(err);
          alert(err)
        }
      })
    }

  }


}
