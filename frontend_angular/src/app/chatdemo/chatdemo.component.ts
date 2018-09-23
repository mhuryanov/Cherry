import { Component, OnInit } from '@angular/core';
import { ChatService } from '../shared/services/chat.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactsService } from '../shared/services/contacts.service';
import { StaffService } from '../shared/services/staff.service';
import { LoginService } from '../shared/services/login.service';
import { config } from '../shared/modules/config.model';

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

  profile;

  isShowMessage = false;

  contactList = [];

  constructor(
    private chatService: ChatService,
    private activedRoute: ActivatedRoute,
    private staffService: StaffService,
    private loginService: LoginService,
    private contactService: ContactsService
  ) {
    var me = this;
    this.userId = activedRoute.snapshot.params['userId'];
    var token = localStorage.getItem('token');
    if (token) {
      this.preProcess();
    } else {
      this.loginService.getToken().subscribe(tokenData => {
        localStorage.setItem('token', tokenData['token']);
        me.preProcess();
      });
    }
  }

  preProcess() {
    var me = this;
    me.staffService.getStaffList().subscribe(staffs => {
      me.staffArray = staffs['data'];
    });

    me.chatService.loadChatContent(this.staffId, this.userId).subscribe(chatContents => {
      chatContents['data'].map(chatItem => {
        var username = '';
        if (chatItem['user_id'].toString() === me.userId.toString()) {
          // if (chatItem['message_type'] === 'userTostaff') {
          //   me.contactService.getUserProfile(chatItem['user_id']).subscribe(data => {
          //     if (data['error'] === 0) {
          //       var exist = false;
          //       me.profileArray.map(temp => {
          //         if (temp.id === data['data'][0]['id']) {
          //           exist = true;
          //         }
          //       });
          //       if (!exist) {
          //         me.profileArray.push(data['data'][0]);
          //       }
          //     }
          //   });
          // }

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

    this.contactService.getUserProfile(this.userId).subscribe(profile => {
      // console.log(profile);
      if (profile['error'] === 0 && profile['data'].length > 0) {
        me.profile = profile['data'][0];
      } else {
        alert('In the cherry system, such this user does not exist!');
      }
    });

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

    this.contactService.getContacts().subscribe(contacts => {
      console.log(contacts);
      if (contacts['success'] === 1) {
        me.contactList = contacts['data'];
        var isExist = false;
        me.contactList.map(contact => {
          if (contact['user_id'].toString() === me.userId.toString()) {
            isExist = true;
          }
        });
        if (!isExist) {
          me.chatService.sendMsg({
            type: 'requestchat',
            userId: this.userId
          });
        }
      }
    });

    setTimeout(function () { me.isShowMessage = true;  }, 5000);
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

  selectImage() {
    document.getElementById('profile-imgage-upload').click();
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    var me = this;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('photo', file, file.name);

      this.chatService.uploadProfileImage(formData).subscribe((data: any) => {
        var upload_url = config.baseURL + data.url;
        // this.profileService.editProfile(this.profile).subscribe(data1 => {
        //   // location.reload();
        // });
        var msgdata = {
          type: 'userTostaff',
          staffId: me.staffId,
          userId: me.userId,
          msg: upload_url,
          isMedia: true
        };
        me.chatService.sendMsg(msgdata);
      });
    }

}
