import { Component, OnInit } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';

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
    private chatService: ChatService
  ) { }

  ngOnInit() {
    var me = this;
    this.chatService.messages.subscribe(msg => {
      if (msg.text.staffId.toString() === me.staffId.toString() && msg.text.userId.toString() === me.userId.toString()) {
        me.chatContentsArray.push(msg.text);
        var elmnt = document.getElementById('scrollToView');
        setTimeout(() => {
          elmnt.scrollIntoView();
        }, 100);
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
