import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Injectable() // decorator to define class of service
export class AdminService {
    url: string;
    constructor(
        public http: HttpClient,
        public router: Router,
        // public location:Location
    ) {
        this.url = 'auth/';
    }

    login(data: any) {
        return this.http.post(this.url + 'login', data, this.getOptions());
    }

    getOptions() {
        let headers = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return headers;
    }
    loggedIn() {
      return !!localStorage.getItem('token');
    }
    getToken() {
      return localStorage .getItem('token');
    }
    logoutUser() {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
      // location.reload();
      }
    // forgotPassword(email: string) {
    //     // call with email in API
    //     return this.http.post(this.url + 'forgot-password', { email: email }, this.getOptions());
    // }
    // resetPassword(data: any) {
    //     // call with reset API
    //     return this.http.post(this.url + 'reset-password/'+data.username, data, this.getOptions());

    // }
    // // service is a file where we use repeatedely used speic task perfroming logic
    // // service in angular is used to call Backend API
}
