import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../shared/services/contacts.service';
import { TagService } from '../shared/services/tag.service';
import { StatusService } from '../shared/services/status.service';
import { ActionService } from '../shared/services/action.service';
import { StaffService } from '../shared/services/staff.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  timeFilter = '';

  constructor(
    private contactsService: ContactsService,
    private tagService: TagService,
    private statusService: StatusService,
    private actionService: ActionService,
    private staffService: StaffService,
    private router: Router
  ) {
    this.loadContacts();
   }

  loadContacts() {
    var me = this;
    var userId = localStorage.getItem('userId');
    var role = localStorage.getItem('role');
    me.contactsList = [];
    me.contactsListShow = [];
    this.contactsService.getContacts().subscribe(data => {
      if (data['success'] === 1) {
        data['data'].map(contact => {
          if (role.toString() === '2') {
            if (contact['staff'].toString() === userId) {
              me.contactsList.push(contact);
            }
          } else {
            me.contactsList.push(contact);
          }
        });

        me.contactsList.map(contact => {
          me.tagService.getTagName(contact['tags']).subscribe(tag => {
            contact['tags'] = tag['data'][0]['name'];
          });

          me.statusService.getStatusName(contact['status']).subscribe(status => {
            contact['status'] = status['data'][0]['name'];
          });

          me.actionService.getActionName(contact['actions']).subscribe(action => {
            contact['actions'] = action['data'][0]['name'];
          });

          me.staffService.getStaffName(contact['staff']).subscribe(staff => {
            contact['staff'] = staff['data'][0]['name'];
          });
          contact['check'] = false;
        });

        me.contactsListShow = me.contactsList;
      }
    });
  }

  ngOnInit() {
  }

  filter() {
    var me = this;
    console.log(me.contactsListShow);
    me.contactsListShow = me.contactsList.filter(function (el) {
      if (!me.isAdvancedFiltering) {
        return el.name.toLowerCase().includes(me.searchFilter.toLowerCase());
      }
      return el.tags.toLowerCase().includes(me.tagFilter.toLowerCase())
        && el.name.toLowerCase().includes(me.searchFilter.toLowerCase())
        && el.status.toLowerCase().includes(me.statusFilter.toLowerCase())
        && el.actions.toLowerCase().includes(me.actionsFilter.toLowerCase())
        && el.messages.toLowerCase().includes(me.messagesFilter.toLowerCase())
        && el.date_of_creation.toLowerCase().includes(me.dateofcreationFilter.toLowerCase())
        && el.staff.toLowerCase().includes(me.staffFilter.toLowerCase())
        && el.rating.toString().toLowerCase().includes(me.ratingFilter.toLowerCase())
        && el.time.toString().toLowerCase().includes(me.timeFilter.toLowerCase())
        && el.note.toLowerCase().includes(me.noteFilter.toLowerCase());
    });
  }

  deleteSelected() {
    var me = this;
    var checkedList = [];
    checkedList = me.contactsListShow.filter(function(el) {
      return el.check;
    });

    console.log(checkedList);
    if (checkedList.length === 0) {
      alert('Please select contact list to delete!');
      return;
    }

    checkedList.map(contact => {
      me.contactsService.delete(contact.id).subscribe(data => {
        console.log(data);
        me.loadContacts();
      });
    });
  }

  gotochat(contactId, userId) {
    this.router.navigate(['/dashboard/chat/' + contactId + '/' + userId]);
  }
}
