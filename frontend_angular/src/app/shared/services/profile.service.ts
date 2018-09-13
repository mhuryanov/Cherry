import { Injectable } from '@angular/core';
import { Profile } from '../modules/profile.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../modules/config.model';

@Injectable()
export class ProfileService {

  profile: Profile;
  token;
  id;
  header;
  constructor(
    private http: HttpClient
  ) {
    
  }

  makeHeder() {
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('userId');
    this.header = new HttpHeaders({ 'token': this.token });
  }

  getProfile() {
    this.makeHeder();
    return this.http.get(config.baseURL + 'api/users/' + this.id, {headers: this.header});
  }

  editProfile(profileInfo) {
    return this.http.put(config.baseURL + 'api/users/' + this.id, profileInfo, {headers: this.header});
  }

  changePassword(password) {
    return this.http.post(config.baseURL + 'users/changepassword', password, {headers: this.header});
  }

  uploadProfileImage(formdata) {
    return this.http.post(config.baseURL + 'upload', formdata);
  }

}
