import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../modules/config.model';
@Injectable()
export class ContactsService {
  token;
  header;
  constructor(
    private http: HttpClient
  ) {
    this.token = localStorage.getItem('token');
    this.header = new HttpHeaders({ 'token': this.token });
   }

  getContacts() {
    return this.http.get(config.baseURL + 'remote/getUsers', { headers: this.header });
  }

}
