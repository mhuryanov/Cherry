import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

@Injectable()
export class AuthguardService implements CanActivate {

  constructor(
    public router: Router,
    private loginService: LoginService
  ) { }

  canActivate(): boolean {
    if (localStorage.getItem('token') != null) {
      this.loginService.token = localStorage.getItem('token');
      return true;
    }
    return false;
  }

}
