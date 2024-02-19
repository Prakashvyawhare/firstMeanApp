import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token : string=''
  url = 'http://localhost:3000/api/auth';
  constructor(private http: HttpClient) {}

  getValue(key:string){
    return this.token;
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
      this.token=res.token
    });
  }
}
