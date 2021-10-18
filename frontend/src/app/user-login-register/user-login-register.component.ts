import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserLoginRegisterService } from './user-login-register.service';
import { Router } from '@angular/router';
import { UserService } from '@app/user.service';

@Component({
  selector: 'app-user-login-register',
  templateUrl: './user-login-register.component.html',
  styleUrls: ['./user-login-register.component.less']
})
export class UserLoginRegisterComponent implements OnInit {

  isRegister: boolean = false;
  selectedCar: number;
  loading: boolean = false;

  VALIDATION_REGX_EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  VALIDATION_REGX_EMAIL_SAO = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  VALIDATION_PASSWORD = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!~^_;:,-.=*#?|])[A-Za-z\\d@$!~^_;:,-.=*#?|]{1,}$";

  signInFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.VALIDATION_REGX_EMAIL)]),// /^[6-9]\d{9}$/,
    password: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(6)]),
  });

  signUpFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern(this.VALIDATION_REGX_EMAIL)]),// /^[6-9]\d{9}$/,
    password: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(6)]),
    firstName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(1)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(1)]),
    username: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.minLength(1)]),
    role: new FormControl('', [Validators.required]),
  });

  constructor(
    public userLoginRegisterService: UserLoginRegisterService,
    private router: Router,
    private userService : UserService
  ) {
    this.signInFormGroup.valueChanges.subscribe(val => {
      console.log('signInFormGroup val: ', val);
      console.log("signInFormGroup: ", this.signInFormGroup);
    });

    this.signUpFormGroup.valueChanges.subscribe(val => {
      console.log('signUpFormGroup val: ', val);
      console.log("signUpFormGroup: ", this.signUpFormGroup);
    });
  }

  ngOnInit(): void {
  }

  loginRegister(type){
    if(type == 1){
      this.isRegister = false
    }
    else{
      this.isRegister = true
    }
  }

  signUp(){
    this.loading = true;
    this.userLoginRegisterService.signUp(this.signUpFormGroup).subscribe(res => {
      this.loading = false;
      console.log(res);
      this.isRegister = false
      this.userService.alertToUser(res['message']);
    }, 
    error => {
      this.loading = false;
      console.log(error['error'])
      let errorObject = error['error']
      this.userService.alertToUser(errorObject['message']);
      return;
    })
  }

  signIn(){
    this.loading = true;
    this.userLoginRegisterService.signIn(this.signInFormGroup).subscribe(res => {
      this.loading = false;
      console.log(res)
      sessionStorage.setItem('accessToken', res['token']);
      this.userService.user = res['user'];
      if(res['user']['role'] == 1){
        this.userService.isAdmin = true
      }
      else{
        this.userService.isAdmin = false
      }
      console.log('User details', this.userService.user);
      this.router.navigate(['/admin']);
    },
    error => {
      this.loading = false;
      console.log(error['error'])
      let errorObject = error['error']
      this.userService.alertToUser(errorObject['message']);
      return;
    })
  }
  
}
