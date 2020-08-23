import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  user;
  submitting: boolean = false;
  rememberMe: boolean = false;
  registrationForm: FormGroup;
  constructor(
    public adminService: AdminService,
    public router: Router,
    public fb: FormBuilder,
    public snackbar: MatSnackBar
  ) {
    // this.user = {
    //   userName: '',
    //   password: ''
    // };

   }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get userName() {
    return this.registrationForm.get('userName');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  login() {
    this.adminService.login(this.registrationForm.value)
    .subscribe(
      (data: any) => {
        console.log('data:', data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        this.router.navigate(['/admin/home']);
        if (this.rememberMe) {
          localStorage.setItem('remember', 'ok');
      }
        this.snackbar.open('Login Successful', 'ok', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      },
      (err) => {
          // if error ??? send the error data to msg service show Error method
          console.log(err);
      }
    );
  }

  rememberMeChanged() {
    console.log('rememberMeChanged')
    this.rememberMe = !this.rememberMe;
}

}
