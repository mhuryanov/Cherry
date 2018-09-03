import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../shared/services/contacts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TagService } from '../shared/services/tag.service';
import { StatusService } from '../shared/services/status.service';
import { ActionService } from '../shared/services/action.service';
import { StaffService } from '../shared/services/staff.service';
import { TemplateService } from '../shared/services/template.service';
import { ChatService } from '../shared/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  contactId;
  userId;
  userProfile = false;
  contactInfo;

  saveNoteBtnStr = 'Save';

  isAddTag = false;

  tagList = [];
  showTagList = [];

  selectedTagId = -1;

  templates = [];
  showTemplates = [];

  searchTemplateStr = '';

  sendMessageStr = '';

  staffId;

  chatContentsArray = [];

  imageUrlArray = [
    'https://cdn-images-1.medium.com/max/2000/1*y3c9ggOkOzdAr8JC7TUrEQ@2x.png',
    'https://cdn.dribbble.com/users/575153/screenshots/3661919/thumb.gif'
  ];
  constructor(
    private contactService: ContactsService,
    private activedRoute: ActivatedRoute,
    private tagService: TagService,
    private statusService: StatusService,
    private actionService: ActionService,
    private staffService: StaffService,
    private templateService: TemplateService,
    private chatService: ChatService
  ) {
    var me = this;
    this.contactId = activedRoute.snapshot.params['contactId'];
    this.userId = activedRoute.snapshot.params['userId'];
    this.staffId =  localStorage.getItem('userId');
    contactService.getUserProfile(this.userId).subscribe(data => {
      if (data['error'] === 0) {
        me.userProfile = data['data'][0];
      }
    });

    contactService.getContact(this.contactId).subscribe(data => {
      if (data['success'] === 1) {
        me.contactInfo = data['data'][0];
        me.statusService.getStatusName(me.contactInfo['status']).subscribe(status => {
          me.contactInfo['status'] = status['data'][0];
        });

        me.actionService.getActionName(me.contactInfo['actions']).subscribe(action => {
          me.contactInfo['actions'] = action['data'][0];
        });

        me.staffService.getStaffName(me.staffId).subscribe(staff => {
          me.contactInfo['staff'] = staff['data'][0];
          me.staffId = staff['data'][0]['id'];
          me.contactService.updateContact(me.contactId, {staff: me.staffId, status: 2}).subscribe(data1 => {
            if (data1['success'] === 1) {
              me.chatService.sendMsg({
                type: 'startChat',
                staffId: me.staffId,
                userId: me.userId
              });
            }
          });
        });

        var tagIds = me.contactInfo['tags'].split(',');
        me.contactInfo['tagsArray'] = [];
        tagIds.map(tagId => {
          me.tagService.getTagName(tagId).subscribe(tag => {
            me.contactInfo['tagsArray'].push(tag['data'][0]);
          });
        });
      }
    });

    this.tagService.getTagList().subscribe(data => {
      if (data['success'] === 1) {
        me.tagList = data['data'];
      }
    });

    this.templateService.getTemplateList().subscribe(data => {
      if (data['success'] === 1) {
        me.templates = data['data'];
        me.showTemplates = data['data'];
      }
    });
  }

  ngOnInit() {
    var me = this;
    this.chatService.messages.subscribe(msg => {
      console.log(msg);
      if ((msg.text.type === 'userTostaff' || msg.text.type === 'staffTouser') && msg.text.staffId.toString() === me.staffId.toString() && msg.text.userId.toString() === me.userId.toString()) {
        me.chatContentsArray.push(msg.text);
        var elmnt = document.getElementById('scrollToView');
        // elmnt.scrollIntoView();
        setTimeout(() => {
          elmnt.scrollIntoView();
        }, 100);
      }
    });
  }

  saveNote() {
    var me = this;
    var contactData = {
      note: this.contactInfo.note
    };
    this.saveNoteBtnStr = 'Saving...';
    this.contactService.updateContact(this.contactId, contactData).subscribe(data => {
      me.saveNoteBtnStr = 'Saved';
    });
  }

  clickAddTag() {
    var me = this;
    this.isAddTag = !this.isAddTag;
    this.showTagList = [];
    if (this.isAddTag) {
      var tagIds = me.contactInfo['tags'].split(',');
      this.tagList.map(tag => {
        if (!tagIds.includes(tag['id'].toString())) {
          me.showTagList.push(tag);
        }
      });
    }
  }

  addTag() {
    var me = this;
    if (this.selectedTagId === -1) {
      return;
    }
    this.tagList.map(tag => {
      if (tag['id'].toString() === me.selectedTagId) {
        me.contactInfo['tags'] = me.contactInfo['tags'] + ',' + me.selectedTagId;
        var contactData = {
          tags: me.contactInfo['tags']
        };
        me.contactService.updateContact(me.contactId, contactData).subscribe(data => {
          me.contactInfo['tagsArray'].push(tag);
          me.isAddTag = false;
          me.clickAddTag();
        });
      }
    });
  }

  searchTemplate() {
    var me = this;
    this.showTemplates = this.templates.filter(function(template) {
      return template['name'].toLowerCase().includes(me.searchTemplateStr.toLowerCase());
    });
  }

  addNewTemplate() {
    if (this.showTemplates.length !== 0) {
      return;
    }

    var me = this;
    var templatedata = {
      name: me.searchTemplateStr
    };
    this.templateService.addNewTemplate(templatedata).subscribe(data1 => {
      this.templateService.getTemplateList().subscribe(data => {
        if (data['success'] === 1) {
          me.templates = data['data'];
          me.showTemplates = data['data'];
          me.searchTemplate();
        }
      });
    });
  }

  sendMessage() {
    if (this.sendMessageStr === '') {
      return;
    }
    var data = {
      type: 'staffTouser',
      staffId: this.staffId,
      userId: this.userId,
      msg: this.sendMessageStr
    };
    this.chatService.sendMsg(data);
    this.sendMessageStr = '';
  }

  clickTempItem(temp) {
    this.sendMessageStr += temp;
  }
}
