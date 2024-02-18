import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  isShowLoader:boolean=false;
  signupForm=new FormGroup({
    userName: new FormControl ("",{validators:[Validators.required,Validators.email]}),
    password:new FormControl("",{validators:[Validators.required,Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]}),
    confirmPassword: new FormControl("",{validators:[Validators.required]})
  })
  constructor(private authService: AuthService) {
    
   }
  ngOnInit(): void {
  }
  onSubmit(){
    this.isShowLoader=true;
if (this.signupForm.invalid) {
  this.signupForm.markAllAsTouched()
this.isShowLoader=false;
}else{
  this.authService.signup(this.signupForm.value.userName,this.signupForm.value.password);
  this.isShowLoader=false;
}
  }

}
