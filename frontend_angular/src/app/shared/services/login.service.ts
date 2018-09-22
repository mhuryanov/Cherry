import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config} from '../modules/config.model';

@Injectable()
export class LoginService {

  token;

  constructor(
    private http: HttpClient
  ) {
    this.token = localStorage.getItem('token');
  }

  login(userInfo) {
    return this.http.post(config.baseURL + 'users/login', userInfo);
  }

  getToken() {
    return this.http.get(config.baseURL + 'users/token');
  }
}
