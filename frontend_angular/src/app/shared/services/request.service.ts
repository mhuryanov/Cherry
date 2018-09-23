import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../modules/config.model';

@Injectable()
export class RequestService {

  token;
  header;
  table_name = 'request';
  constructor(
    private http: HttpClient
  ) {
    this.makeHeader();
  }

  makeHeader() {
    this.token = localStorage.getItem('token');
    this.header = new HttpHeaders({ 'token': this.token });
  }

  getRequests() {
    this.makeHeader();
    return this.http.get(config.baseURL + 'api/' + this.table_name, { headers: this.header });
  }

}
