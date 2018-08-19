import { Injectable } from '@angular/core';
import { Staff } from '../modules/staff.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../modules/config.model';

@Injectable()
export class StaffService {

  staffList = [];
  table_name = 'users';
  token;
  header;
  constructor(
    private http: HttpClient
  ) {
    this.token = localStorage.getItem('token');
    this.header = new HttpHeaders({ 'token': this.token });
  }

  getStaffList() {
    return this.http.get(config.baseURL + 'api/' + this.table_name, { headers: this.header });
  }

  addNewStaff(newStaff) {
    return this.http.post(config.baseURL + 'api/' + this.table_name, newStaff, {headers: this.header});
  }

  editStaff(editStaff) {
    return this.http.put(config.baseURL + 'api/' + this.table_name + '/' + editStaff.id, editStaff, {headers: this.header});
  }

}
