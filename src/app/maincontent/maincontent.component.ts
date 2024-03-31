import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-maincontent',
  templateUrl: './maincontent.component.html',
  styleUrls: ['./maincontent.component.css']
})
export class MaincontentComponent implements OnInit {

  @ViewChild('fileInput')
  fileInput!: ElementRef;

  // class property
  allposts: any = []

  postDetails = { recipename: '', description: '', image: '' }
  token: string = ''

  // userId:any=''

  SERVER_URL = 'http://localhost:3000'

  whopost: any = []


  constructor(private api: ApiService, private http: HttpClient) { }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.postDetails.image = file;
  }

  ngOnInit(): void {

    const storedToken = sessionStorage.getItem('token')
    this.token = storedToken ? storedToken : '';

    this.getAllPosts();


    // this.getwhopost()



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

  // getall post 

  getAllPosts(): void {

    const reqHeader = new HttpHeaders().set("Authorization", `Bearer ${this.token}`);

    this.api.getallUsersPosts(reqHeader).subscribe({
      next: (res: any[]) => {

        this.allposts = res

        // Reverse the order of posts
        this.allposts.reverse();


        this.allposts.forEach((post: any) => {

          // getwhopost api
          this.api.whoPostAPI(post.userId).subscribe({
            next: (res: any) => {
              post.res = res

            },
            error: (err: any) => {
              console.log(err);
            }
          })

          console.log(this.allposts);

        });



      },
      error: (err: any) => {
        console.log(err);
        alert(err)
      }
    })
  }


}
