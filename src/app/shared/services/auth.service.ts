import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   url='http://localhost:3000/api/auth'
  constructor(private http:HttpClient) { }
  signup(userName:string,password:string){
    let userDeatails={userName:userName,password:password};
this.http.post(`${this.url}/signup`,userDeatails).subscribe((res:any)=>{console.log(res);
})
  }
  login(userName:string,password:string){
    let userDeatails={userName:userName,password:password};
this.http.post(`${this.url}/login`,userDeatails).subscribe((res)=>{
  console.log(res);
  
})
  }
}
