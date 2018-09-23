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
    this.makeHeader();
  }

  makeHeader() {
    this.token = localStorage.getItem('token');
    this.header = new HttpHeaders({ 'token': this.token });
  }

  getStaffList() {
    this.makeHeader();
    return this.http.get(config.baseURL + 'api/' + this.table_name, { headers: this.header });
  }

  addNewStaff(newStaff) {
    this.makeHeader();
    return this.http.post(config.baseURL + 'api/' + this.table_name, newStaff, {headers: this.header});
  }

  editStaff(editStaff) {
    this.makeHeader();
    return this.http.put(config.baseURL + 'api/' + this.table_name + '/' + editStaff.id, editStaff, {headers: this.header});
  }

  getStaff(staffId) {
    this.makeHeader();
    return this.http.get(config.baseURL + 'api/' + this.table_name + '/' + staffId, { headers: this.header });
  }

  deleteStaff(staffId) {
    this.makeHeader();
    return this.http.delete(config.baseURL + 'api/' + this.table_name + '/' + staffId, {headers: this.header});
  }

}
