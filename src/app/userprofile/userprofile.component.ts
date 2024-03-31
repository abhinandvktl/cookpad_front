import { Component, OnInit } from '@angular/core';
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

  loggeduserdetails: any;

  token: string = ''

  userposts: any = []

  SERVER_URL = 'http://localhost:3000'
  username: any = ''

  recipename: any = ''
  description: any = ''

  postDetails = { recipename: '', description: '', image: '' }


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
  handleupdate(event: any): void {
    event.preventDefault();
    if (!this.recipename || !this.description) {
      alert('please fill the form completely')
    } else {
      const reqBody = new FormData();
      reqBody.append('recipename', this.recipename);
      reqBody.append('make', this.description);

      const reqHeader = new HttpHeaders().set("Authorization", `Bearer ${this.token}`)

      this.api.editPost(this.loggeduserdetails._id, reqBody, reqHeader).subscribe({
        next: (result: any) => {
          if (result.status === 200) {
            // Update user interface as needed
            alert('Updated Post..');
            // Optionally close modal or do any other action needed
          } else {
            alert(result.response.data);
          }
        },
        error: (error: any) => {
          console.error(error);
          alert('An error occurred while updating the post.');
        }
      })
    }
  }

  // editPostinfo(postId:any){

  //   const reqBody = {
  //     recipename: this.recipename

  //   }

  //   const reqHeader = new HttpHeaders().set("Authorization", `Bearer ${this.token}`)

  //   this.api.editPost(postId,reqBody,reqHeader).subscribe({
  //     next:(res:any)=>{
  //       console.log(res);
  //       alert('post updated')
  //     },
  //     error:(err:any)=>{
  //       console.log(err);
  //       alert(err)

  //     }
  //   })
  // }


  // delete post
  deletepost(postId:any){

    const reqHeader = new HttpHeaders().set("Authorization", `Bearer ${this.token}`)

    this.api.deletepost(postId,reqHeader).subscribe({
      next: (res: any) => {
        console.log(res);
        alert('post deleted successfully')
      },
      error: (err: any) => {
        console.log(err);

      }
    })
  }


  handleAddPost(form: NgForm): void {
    if (!form.valid) {
      alert("please fill the form")
    } else {
      const reqBody = new FormData();
      reqBody.append("recipename", this.postDetails.recipename)
      reqBody.append("description", this.postDetails.description)
      reqBody.append("image", this.postDetails.image)


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
