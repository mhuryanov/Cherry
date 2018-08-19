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
    // const staff1 = {
    //   id: '1',
    //   name: 'Pat',
    //   email: 'test@mail.com',
    //   phone: '+1 555 5555 5555',
    //   avartar: '../assets/default-user.png',
    //   description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic , remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    //   role: 1
    // };

    // const staff2 = {
    //   id: '2',
    //   name: 'Pat2',
    //   email: 'test2@mail.com',
    //   phone: '+1 555 5555 5555',
    //   avartar: '../assets/default-user.png',
    //   description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic , remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    //   role: 2
    // };

    // this.staffList.push(staff1);
    // this.staffList.push(staff2);

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
