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

  getContact(contactId) {
    return this.http.get(config.baseURL + 'api/' + this.table_name + '/' + contactId, { headers: this.header });
  }

  delete(id) {
    return this.http.delete(config.baseURL + 'api/' + this.table_name + '/' + id, { headers: this.header });
  }

  getUserProfile(userId) {
    return this.http.get(config.baseURL + 'remote/getUserProfile/' + userId, { headers: this.header });
  }

  updateContact(contactId, contactData) {
    return this.http.put(config.baseURL + 'api/' + this.table_name + '/' + contactId, contactData, { headers: this.header });
  }

  updateByUserId(userId, contactData) {
    return this.http.put(config.baseURL + 'api/contactsupdate/' + userId, contactData);
  }

}
