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
  contactsListShow = [];
  isAdvancedFiltering = false;
  tagFilter = '';
  searchFilter = '';
  statusFilter = '';
  actionsFilter = '';
  messagesFilter = '';
  dateofcreationFilter = '';
  staffFilter = '';
  ratingFilter = '';
  noteFilter = '';

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
        console.log(data);
        
        me.contactsList = data['data'];
        // me.contactsListShow = data['data'];
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

        me.contactsListShow = me.contactsList;
      }
    });
   }

  ngOnInit() {
  }

  // search() {
  //   var me = this;
  //   me.contactsListShow = me.contactsList.filter(function (el) {
  //     return el.name.includes(me.searchFilter);
  //   });
  // }

  filter() {
    var me = this;
    me.contactsListShow = me.contactsList.filter(function (el) {
      if (!me.isAdvancedFiltering) {
        return el.name.includes(me.searchFilter);
      }
      return el.tags.includes(me.tagFilter)
            && el.name.includes(me.searchFilter)
            && el.status.includes(me.statusFilter)
            && el.actions.includes(me.actionsFilter)
            && el.messages.includes(me.messagesFilter)
            && el.date_of_creation.includes(me.dateofcreationFilter)
            && el.staff.includes(me.staffFilter)
            && el.rating.toString().includes(me.ratingFilter)
            && el.note.includes(me.noteFilter);
    });
  }
}
