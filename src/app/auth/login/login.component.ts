import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isShowLoader:boolean=false;
  loginForm=new FormGroup({
    userName: new FormControl ("",{validators:[Validators.required]}),
    password:new FormControl("",{validators:[Validators.required,]})
  })
  constructor( private authService: AuthService) {
    
   }
  ngOnInit(): void {
  }
  onSubmit(){
    this.isShowLoader=true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
    this.isShowLoader=false;
    }else{
      this.authService.login(this.loginForm.value.userName,this.loginForm.value.password);
      this.isShowLoader=false;
    }
  }
}
