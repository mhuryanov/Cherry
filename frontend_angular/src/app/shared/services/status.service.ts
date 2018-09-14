import { Injectable } from '@angular/core';
import { Status } from '../modules/status.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../modules/config.model';

@Injectable()
export class StatusService {

  statusList = [];
  table_name = 'status';
  token;
  header;

  constructor(
    private http: HttpClient
  ) {
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

  getStatusName(statusId) {
    return this.http.get(config.baseURL + 'api/' + this.table_name + '/' + statusId, { headers: this.header });
  }

  deleteStatus(statusId) {
    return this.http.delete(config.baseURL + 'api/' + this.table_name + '/' + statusId, { headers: this.header });
  }


}
