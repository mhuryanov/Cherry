import { Injectable } from '@angular/core';
import { Action } from '../modules/action.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../modules/config.model';

@Injectable()
export class ActionService {

  actionList = [];
  table_name = 'action';
  token;
  header;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
    this.header = new HttpHeaders({ 'token': this.token });
   }

  getStatusList() {
    return this.http.get(config.baseURL + 'api/' + this.table_name, { headers: this.header });
  }

  addNewStatus(newStatus) {
    return this.http.post(config.baseURL + 'api/' + this.table_name, newStatus, { headers: this.header });
  }

  editStatus(editStatus) {
    return this.http.put(config.baseURL + 'api/' + this.table_name + '/' + editStatus.id, editStatus, { headers: this.header });
  }

}
