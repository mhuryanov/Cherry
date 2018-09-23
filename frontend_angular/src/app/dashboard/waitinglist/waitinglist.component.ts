import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../shared/services/chat.service';
import { ContactsService } from '../../shared/services/contacts.service';
import { config } from '../../shared/modules/config.model';
import { Route, Router } from '@angular/router';
import { RequestService } from '../../shared/services/request.service';

@Component({
  selector: 'app-waitinglist',
  templateUrl: './waitinglist.component.html',
  styleUrls: ['./waitinglist.component.scss']
})
export class WaitinglistComponent implements OnInit {
  waitingList = [];
  contactList = [];
  constructor(
    private chatService: ChatService,
    private contactsService: ContactsService,
    private router: Router,
    private requestService: RequestService
  ) {
    var me = this;
    Notification.requestPermission();
    contactsService.getContacts().subscribe(contacts => {
      if (contacts['success'] === 1 && contacts['data'].length > 0) {
        me.contactList = contacts['data'];
      }
    });
  }

  ngOnInit() {
    var me = this;
    this.chatService.messages.subscribe(msg => {
      if (msg.text.type === 'requestchat') {
        var userId = msg.text.userId;
        var isExist = false;
        me.waitingList.map(waitItem => {
          if (userId.toString() === waitItem.userId.toString()) {
            isExist = true;
          }
        });

        if (isExist) {
          return;
        }

        var isConnected = false;
        me.contactList.map(contact => {
          if (contact['user_id'].toString() === userId.toString()) {
            isConnected = true;
          }
        });

        if (isConnected) {
          return;
        }

        me.contactsService.getUserProfile(userId).subscribe(user => {
          if (user['error'] === 0 && user['data'].length > 0) {
            if (user['data'][0]['image'] === '' || user['data'][0]['image'] === '/upload/profile-placeholder.png') {
              user['data'][0]['image'] = config.baseURL + 'avartar.png';
            }
            me.waitingList.push({
              userId: userId,
              image: user['data'][0]['image'],
              name: user['data'][0]['first_name'] + ' ' + user['data'][0]['last_name']
            });

            var e = new Notification('New Request', {
              body: user['data'][0]['first_name'] + ' ' + user['data'][0]['last_name'] + 'is requesting to accept chat.',
              icon: user['data'][0]['image']
            });

            e.onclick = function () {
            };
          }
        });
      }

      if (msg.text.type === 'userTostaff') {
        var userId = msg.text.userId;
        me.contactsService.getUserProfile(userId).subscribe(user => {
          if (user['error'] === 0 && user['data'].length > 0) {
            if (user['data'][0]['image'] === '' || user['data'][0]['image'] === '/upload/profile-placeholder.png') {
              user['data'][0]['image'] = config.baseURL + 'avartar.png';
            }

            var e = new Notification(user['data'][0]['first_name'] + ' ' + user['data'][0]['last_name'] + 'is sending new message', {
              body:  msg.text.msg,
              icon: user['data'][0]['image']
            });

            e.onclick = function () {
            };
          }
        });
      }

      if (msg.text.type === 'acceptchat') {
        this.loadRequests();
      }
    });

    this.loadRequests();
  }

  loadRequests() {
    var me = this;
    this.requestService.getRequests().subscribe(requests => {
      console.log(requests);
      if (requests['success'] === 1 && requests['data'].length > 0) {
        me.waitingList = [];
        requests['data'].map(request => {
          me.contactsService.getUserProfile(request['user_id']).subscribe(user => {
            if (user['error'] === 0 && user['data'].length > 0) {
              if (user['data'][0]['image'] === '' || user['data'][0]['image'] === '/upload/profile-placeholder.png') {
                user['data'][0]['image'] = config.baseURL + 'avartar.png';
              }
              me.waitingList.push({
                userId: request['user_id'],
                image: user['data'][0]['image'],
                name: user['data'][0]['first_name'] + ' ' + user['data'][0]['last_name']
              });

            }
          });
        });
      }
    });
  }

  accept(waitItem) {
    var me = this;
    var checkData = {
      userId: waitItem.userId,
      staffId: localStorage.getItem('userId')
    };
    this.contactsService.contactCheck(checkData).subscribe(data => {
      if (data['success'] === 1) {
        var acceptData = {
          type: 'acceptchat',
          userId: waitItem.userId,
        };
        me.chatService.sendMsg(acceptData);
        me.router.navigate(['/dashboard/chat/' + data['message'] + '/' + waitItem.userId]);
      } else {

      }
    });
  }

}
