import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../environments/environment';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  isAdmin: boolean = false;
  user: any;
  
  constructor(
    private httpClient: HttpClient, 
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private router: Router,) {

  }

  alertToUser(message, logout: boolean = false, isError: boolean = false) {
    const snackbarConfig = new MatSnackBarConfig();
    snackbarConfig.duration = 5000;
    snackbarConfig.verticalPosition = 'top';
    snackbarConfig.horizontalPosition = 'end';
    snackbarConfig.panelClass = ['red-snackbar'];
    this._snackBar.open(message, '', snackbarConfig);
  }
  
  signIn(body) {  
    console.log('body', body)
    return this.httpClient.post(environment.apiUrl+`auth/login`, body);
  }

  signUp(body) {  
    console.log('body', body)
    return this.httpClient.post(environment.apiUrl+`auth/register`, body);
  }

  resendEmail(body) {  
    console.log('body', body)
    return this.httpClient.post(environment.apiUrl+`resend`, body);
  }

  recoverUser(body) {  
    console.log('body', body)
    return this.httpClient.post(environment.apiUrl+`recover`, body);
  }

  signOut(header, body) {  
    console.log('header', header)
    console.log('body', body)
    return this.httpClient.post(environment.apiUrl+`auth/logout`, body, {
      headers: {
        Authorization : header
      }
    });
  }

}
