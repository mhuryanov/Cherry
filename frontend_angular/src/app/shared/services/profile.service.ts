import { Injectable } from '@angular/core';
import { Profile } from '../modules/profile.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../modules/config.model';

@Injectable()
export class ProfileService {

  profile: Profile;
  token;
  id;
  header;
  constructor(
    private http: HttpClient
  ) {
    // console.log(this.profile);
    // this.profile = {
    //   name: 'Pat',
    //   email: 'test@mail.com',
    //   phone: '+1 555 5555 5555',
    //   avartar: '../assets/default-user.png',
    //   description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic , remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
    // };
    this.token = localStorage.getItem('token');
    this.id = localStorage.getItem('userId');
    this.header = new HttpHeaders({'token': this.token});
    // this.http.get(config.baseURL + 'api/users/' + this.id, {headers: this.header}).subscribe(data => {
    //   // console.log('-------------');
    //   // console.log(data);
    //   this.profile = {
    //     name: data.data[0].name,
    //     email: data.data[0].email,
    //     phone: data.data[0].phone,
    //     avartar: data.data[0].avartar,
    //     description: data.data[0].description 
    //   };
    // });
  }

  getProfile() {
    // return this.profile;
    console.log('------------------');
    
    console.log(this.header);
    
    return this.http.get(config.baseURL + 'api/users/' + this.id, {headers: this.header});
  }

}
