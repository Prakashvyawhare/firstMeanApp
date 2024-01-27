import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isShowLoader:boolean=false;
  loginForm=new FormGroup({
    userName: new FormControl ("",{validators:[Validators.required,Validators.email]}),
    password:new FormControl("",{validators:[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]})
  })
  constructor() {
    
   }
  ngOnInit(): void {
  }
  onSubmit(){

  }
}
