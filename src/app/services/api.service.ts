import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  SERVER_URL='http://localhost:3000'

  constructor(private http:HttpClient) { }

  // register api
  registerApi=(user:any)=>{
    return this.http.post(`${this.SERVER_URL}/register`,user)
  }

  // login api
  loginApi=(user:any)=>{
    return this.http.post(`${this.SERVER_URL}/`,user)
  }

  // addpost
  addPost=(reqBody:any,reqHeader:any)=>{
    return this.http.post<any>(`${this.SERVER_URL}/home`, reqBody, { headers: reqHeader })
  }

  // getallpost
  getallUsersPosts(reqHeader: HttpHeaders): Observable<any> {
    return this.http.get(`${this.SERVER_URL}/allposts`, { headers: reqHeader });
  }

  // getuserposts
  getUserPosts(reqHeader:HttpHeaders):Observable<any>{
    return this.http.get(`${this.SERVER_URL}/user/allposts`,{headers:reqHeader})
  }

  // getwhoposts
  whoPostAPI(userId:any): Observable<any> {
    return this.http.get(`${this.SERVER_URL}/user/${userId}`);
  }
  
  // edit user
  editUser=(reqBody:any,reqHeader:any)=>{
    return this.http.put<any>(`${this.SERVER_URL}/user/edit`,reqBody,{headers:reqHeader})
  }

  // edit post
  editPost=(postId:any,reqBody:any,reqHeader:any)=>{
    return this.http.put<any>(`${this.SERVER_URL}/posts/edits/${postId}`,reqBody,reqHeader)
  }

  // delete post
  deletepost=(postId:any,reqHeader:any)=>{
    return this.http.delete<any>(`${this.SERVER_URL}/posts/delete/${postId}`,reqHeader)
  }
}
