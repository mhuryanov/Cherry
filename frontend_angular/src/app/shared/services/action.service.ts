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

  getActionList() {
    return this.actionList;
  }

}
