import { Component, OnInit } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactsService } from '../shared/services/contacts.service';

@Component({
  selector: 'app-chatdemo',
  templateUrl: './chatdemo.component.html',
  styleUrls: ['./chatdemo.component.scss']
})
export class ChatdemoComponent implements OnInit {

  staffId;
  userId;
  chatContentsArray = [];
  sendMessageStr = '';
  constructor(
    private chatService: ChatService,
    private activedRoute: ActivatedRoute,
    private contactService: ContactsService
  ) {
    var me = this;
    this.userId = activedRoute.snapshot.params['userId'];
    var contactData = {
      status: 1
    };
    this.contactService.updateByUserId(this.userId, contactData).subscribe(data => {
      if (data['success'] === 1) {
        me.chatService.sendMsg({
          type: 'changedstatus'
        });
      }
    });
  }

  ngOnInit() {
    var me = this;
    this.chatService.messages.subscribe(msg => {
      if ((msg.text.type === 'userTostaff' || msg.text.type === 'staffTouser') && msg.text.staffId.toString() === me.staffId.toString() && msg.text.userId.toString() === me.userId.toString()) {
        me.chatContentsArray.push(msg.text);
        var elmnt = document.getElementById('scrollToView');
        setTimeout(() => {
          elmnt.scrollIntoView();
        }, 100);
      }

      if (msg.text.type === 'startChat' && msg.text.userId.toString() === me.userId.toString()) {
        me.staffId =  msg.text.staffId;
        console.log(msg);
        console.log(me.staffId);
        
      }
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
