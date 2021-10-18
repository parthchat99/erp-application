import { Injectable } from '@angular/core';
import { UserService } from '@app/user.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
    private userService : UserService
  ) { }

  logout(){
    let authToken = "Bearer "+sessionStorage.getItem('accessToken')
    let body = {_id:this.userService.user['_id']}
    return this.userService.signOut(authToken, body)
  }
}
