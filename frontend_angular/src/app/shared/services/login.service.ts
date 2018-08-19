import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class LoginService {

  token;
  baseURL = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) {
    this.token = localStorage.getItem('token');
  }

  login(userInfo) {
    return this.http.post(this.baseURL + 'users/login', userInfo);
  }

}
