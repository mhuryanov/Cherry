import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../shared/services/contacts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TagService } from '../shared/services/tag.service';
import { StatusService } from '../shared/services/status.service';
import { ActionService } from '../shared/services/action.service';
import { StaffService } from '../shared/services/staff.service';

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
  ) {
    var me = this;
    this.contactId = activedRoute.snapshot.params['contactId'];
    this.userId = activedRoute.snapshot.params['userId'];
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

        me.staffService.getStaffName(me.contactInfo['staff']).subscribe(staff => {
          me.contactInfo['staff'] = staff['data'][0];
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
  }

  ngOnInit() {
  }

}
