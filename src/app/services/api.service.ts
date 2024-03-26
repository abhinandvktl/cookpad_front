import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


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

}
