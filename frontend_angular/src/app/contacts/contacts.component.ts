import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../shared/services/contacts.service';
import { TagService } from '../shared/services/tag.service';
import { StatusService } from '../shared/services/status.service';
import { ActionService } from '../shared/services/action.service';
import { StaffService } from '../shared/services/staff.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contactsList = [];
  constructor(
    private contactsService: ContactsService,
    private tagService: TagService,
    private statusService: StatusService,
    private actionService: ActionService,
    private staffService: StaffService
  ) {
    var me = this;
    this.contactsService.getContacts().subscribe(data => {
      if (data['success'] === 1) {
        me.contactsList = data['data'];
        me.contactsList.map(contact => {
          tagService.getTagName(contact['tags']).subscribe(tag => {
            contact['tags'] = tag['data'][0]['name'];
          });

          statusService.getStatusName(contact['status']).subscribe(status => {
            contact['status'] = status['data'][0]['name'];
          });

          actionService.getActionName(contact['actions']).subscribe(action => {
            contact['actions'] = action['data'][0]['name'];
          });

          staffService.getStaffName(contact['staff']).subscribe(staff => {
            contact['staff'] = staff['data'][0]['name'];
          });
        });
      }
    });
   }

  ngOnInit() {
  }

}
