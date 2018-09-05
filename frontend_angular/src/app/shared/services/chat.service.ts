import { Injectable } from '@angular/core';
import { WebsocketService } from './websocket.service';
import { Observable, Subject } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../modules/config.model';

@Injectable()
export class ChatService {

  messages: Subject<any>;
  header;
  token;

  constructor(
    private wsService: WebsocketService,
    private http: HttpClient
  ) {
    this.messages = <Subject<any>>wsService
      .connect()
      .map((response: any): any => {
        return response;
      });
    this.token = localStorage.getItem('token');
    this.header = new HttpHeaders({ 'token': this.token });
  }

  sendMsg(msg) {
    this.messages.next(msg);
  }

  uploadProfileImage(formdata) {
    return this.http.post(config.baseURL + 'upload', formdata);
  }

  loadChatContent(staffId, userId) {
    return this.http.get(config.baseURL + 'api/chart_' + staffId + '_' + userId, {headers: this.header});
  }

}
