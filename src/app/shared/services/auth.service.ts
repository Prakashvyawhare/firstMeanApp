import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token : string=''
  url = 'http://localhost:3000/api/auth';
  constructor(private http: HttpClient, private router:Router) {}

  getValue(key:string){
    return localStorage.getItem(key);
  }
  setValue(key:string,value:string){
    localStorage.setItem(key,value);
  }

  signup(userName: string, password: string) {
    let userDeatails = { userName: userName, password: password };
    this.http.post(`${this.url}/signup`, userDeatails).subscribe((res: any) => {
      console.log(res);
    });
  }

  login(userName: string, password: string) {
    let userDeatails = { userName: userName, password: password };
    this.http.post<{token:string}>(`${this.url}/login`, userDeatails).subscribe((res:any) => {
      this.token=res.token;
      this.setValue('token',this.token)
      this.router.navigate(['/Posts']);
    });
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/Auth/login'])
  }
}
