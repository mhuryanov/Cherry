import { Component, OnInit } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactsService } from '../shared/services/contacts.service';
import { StaffService } from '../shared/services/staff.service';

@Component({
  selector: 'app-chatdemo',
  templateUrl: './chatdemo.component.html',
  styleUrls: ['./chatdemo.component.scss']
})
export class ChatdemoComponent implements OnInit {

  staffId = '';
  userId;
  chatContentsArray = [];
  sendMessageStr = '';

  staffArray = [];

  profileArray = [];

  constructor(
    private chatService: ChatService,
    private activedRoute: ActivatedRoute,
    private contactService: ContactsService,
    private staffService: StaffService
  ) {
    var me = this;
    this.userId = activedRoute.snapshot.params['userId'];
    this.staffService.getStaffList().subscribe(staffs => {
      me.staffArray = staffs['data'];
    });

    this.chatService.loadChatContent(this.staffId, this.userId).subscribe(chatContents => {
      chatContents['data'].map(chatItem => {
        var username = '';
        if (chatItem['user_id'].toString() === me.userId.toString()) {
          if (chatItem['message_type'] === 'userTostaff') {
            contactService.getUserProfile(chatItem['user_id']).subscribe(data => {
              if (data['error'] === 0) {
                var exist = false;
                me.profileArray.map(temp => {
                  if (temp.id === data['data'][0]['id']) {
                    exist = true;
                  }
                });
                if (!exist) {
                  me.profileArray.push(data['data'][0]);
                }
              }
            });
          }

          me.chatContentsArray.push({
            type: chatItem['message_type'],
            staffId: chatItem['staff_id'],
            userId: chatItem['user_id'],
            msg: chatItem['message'],
            isMedia: chatItem['isMedia'] === 0 ? false : true
          });
        }
      });

      var elmnt = document.getElementById('scrollToView');
      setTimeout(() => {
        elmnt.scrollIntoView();
      }, 1000);
    });
    
  }

  ngOnInit() {
    var me = this;
    this.chatService.messages.subscribe(msg => {
      // if ((msg.text.type === 'userTostaff' || msg.text.type === 'staffTouser') && msg.text.staffId.toString() === me.staffId.toString() && msg.text.userId.toString() === me.userId.toString()) {
        if ((msg.text.type === 'userTostaff' || msg.text.type === 'staffTouser') && msg.text.userId.toString() === me.userId.toString()) {
        me.chatContentsArray.push(msg.text);
        var elmnt = document.getElementById('scrollToView');
        setTimeout(() => {
          elmnt.scrollIntoView();
        }, 100);
      }

      if (msg.text.type === 'startChat' && msg.text.userId.toString() === me.userId.toString()) {
        me.staffId =  msg.text.staffId;
      }
    });

    this.chatService.sendMsg({
      type : 'requestchat',
      userId : this.userId
    });
  }

  sendMessage() {
    if (this.sendMessageStr === '') {
      return;
    }
    var data = {
      type: 'userTostaff',
      staffId: this.staffId,
      userId: this.userId,
      msg: this.sendMessageStr
    };
    this.chatService.sendMsg(data);
    this.sendMessageStr = '';
  }

}
