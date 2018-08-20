import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userInfo = {
    email: 'admin@mail.com',
    password: 'soksunae'
  };
  isEmailErrorValidation = false;
  isPasswordErrorValidation = false;
  isResError = false;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
  }

  login() {

    if (this.userInfo.email === '') {
      this.isEmailErrorValidation = true;
      return;
    }

    if (this.userInfo.password === '') {
      this.isPasswordErrorValidation = true;
      return;
    }
    this.isEmailErrorValidation = false;
    this.isPasswordErrorValidation = false;
    this.isResError = false;

    this.loginService.login(this.userInfo).subscribe(data => {
      console.log(data);
      if (data == null) {
        this.isResError = true;
        return;
      }

      if (data['error'] === 0 ) {
        this.isResError = false;
        this.loginService.token = data['token'];
        localStorage.setItem('token', data['token']);
        localStorage.setItem('userId', data['user'].id);
        this.router.navigate(['/dashboard/home']);
      }

    }, err => {
      console.log(err);
    });


    // this.router.navigate(['/dashboard/home']);
  }

}
