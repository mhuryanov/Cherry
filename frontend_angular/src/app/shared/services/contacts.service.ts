import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../modules/config.model';
@Injectable()
export class ContactsService {
  token;
  header;
  table_name = 'contacts';
  constructor(
    private http: HttpClient
  ) {
    this.token = localStorage.getItem('token');
    this.header = new HttpHeaders({ 'token': this.token });
   }

  getContacts() {
    // return this.http.get(config.baseURL + 'remote/getUsers', { headers: this.header });
    return this.http.get(config.baseURL + 'api/' + this.table_name , {headers : this.header});
  }

}
