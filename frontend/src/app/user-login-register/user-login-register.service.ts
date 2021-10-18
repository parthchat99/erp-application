import { Injectable } from '@angular/core';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})

export class UserLoginRegisterService {

  constructor(
    private userService : UserService
  ) { }

  signIn(data) {
    console.log("data", data)
    let body = data.value
    return this.userService.signIn(body)
  }

  signUp(data) {
    let body = data.value
    return this.userService.signUp(body)
  }

}
