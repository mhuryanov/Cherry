import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../shared/services/contacts.service';
import { TagService } from '../shared/services/tag.service';
import { StatusService } from '../shared/services/status.service';
import { ActionService } from '../shared/services/action.service';
import { StaffService } from '../shared/services/staff.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ChatService } from '../shared/services/chat.service';
import { config } from '../shared/modules/config.model';
import { NgDatepickerModule } from 'ng2-datepicker';
import { DatepickerOptions } from 'ng2-datepicker';
import * as enLocale from 'date-fns/locale/en';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  public date = '';
  options: DatepickerOptions = {
    locale: enLocale,
    addClass: 'form-control',
    addStyle: {width: '100%'},
    displayFormat: 'YYYY-MM-DD',
  };
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
  isShowSendBuldMsg = false;
  bulkMsgStr = '';

  staffList = [];

  constructor(
    private contactsService: ContactsService,
    private tagService: TagService,
    private statusService: StatusService,
    private actionService: ActionService,
    private staffService: StaffService,
    private router: Router,
    private chatService: ChatService
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
          var tagIds = contact['tags'].split(',');
          contact['tagsArray'] = [];
          contact['tags'] = '';
          tagIds.map(tagId => {
            me.tagService.getTagName(tagId).subscribe(tag => {
              contact['tagsArray'].push(tag['data'][0]);
              contact['tags'] += tag['data'][0]['name'];
            });
          });

          // me.tagService.getTagName(contact['tags']).subscribe(tag => {
          //   contact['tags'] += tag['data'][0]['name'];
          //   console.log(contact['tags']);
          // });

          me.statusService.getStatusName(contact['status']).subscribe(status => {
            contact['status'] = status['data'][0]['name'];
          });

          me.actionService.getActionName(contact['actions']).subscribe(action => {
            contact['actions'] = action['data'][0]['name'];
          });

          me.staffService.getStaff(contact['staff']).subscribe(staff => {
            contact['staffName'] = staff['data'][0]['name'];
          });

          me.chatService.getLastMsg(contact['staff'], contact['user_id']).subscribe(chat => {
            if (chat['success'] === 1) {
              contact['messages'] = chat['data'][0];
            }
          });

          me.contactsService.getUserProfile(contact['user_id']).subscribe(user => {
            if (user['error'] === 0 && user['data'].length > 0) {
              contact['profile_image'] = user['data'][0]['image'];
              if (contact['profile_image'] === '' || contact['profile_image'] === '/upload/profile-placeholder.png') {
                contact['profile_image'] = config.baseURL + 'avartar.png';
              }

              contact['name'] = user['data'][0]['first_name'] + ' ' + user['data'][0]['last_name'];
            }
          });
          var min = Math.floor(contact['time'] / 60).toString();
          var sec = (contact['time'] % 60).toString();
          contact['time'] = min + ':' + sec;
          contact['check'] = false;
        });

        me.contactsListShow = me.contactsList;
      }
    });

    this.staffService.getStaffList().subscribe(stafflist => {
      me.staffList = stafflist['data'];
      console.log(me.staffList);
      
    });
  }

  ngOnInit() {
    var me = this;
    this.chatService.messages.subscribe(msg => {
      if (msg.text.type === 'changedstatus') {
       me.loadContacts();
      }
    });
  }

  filter() {
    var me = this;
    me.contactsListShow = me.contactsList.filter(function (el) {
      if (!me.isAdvancedFiltering) {
        return el.name.toLowerCase().includes(me.searchFilter.toLowerCase());
      }
      console.log(el.date_of_creation);
      // console.log(me.date);
      
      
      var d = new Date(me.date),
       month = '' + (d.getMonth() + 1),
       day = '' + d.getDate(),
       year = d.getFullYear();

      if (month.length < 2) { month = '0' + month; }
      if (day.length < 2) { day = '0' + day; }
      
      var real_data = [year, month, day].join('-');
      if (real_data === 'NaN-NaN-NaN') {
        real_data = '';
      }
      console.log(real_data);
      

      return el.tags.toLowerCase().includes(me.tagFilter.toLowerCase())
        && el.name.toLowerCase().includes(me.searchFilter.toLowerCase())
        && el.status.toLowerCase().includes(me.statusFilter.toLowerCase())
        && el.actions.toLowerCase().includes(me.actionsFilter.toLowerCase())
        && el.messages.message.toLowerCase().includes(me.messagesFilter.toLowerCase())
        // && el.date_of_creation.toLowerCase().includes(me.dateofcreationFilter.toLowerCase())
        && el.date_of_creation.toLowerCase().includes(real_data.toLowerCase())
        && el.staffName.toLowerCase().includes(me.staffFilter.toLowerCase())
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

    if (checkedList.length === 0) {
      alert('Please select contact list to delete!');
      return;
    }

    checkedList.map(contact => {
      me.contactsService.delete(contact.id).subscribe(data => {
        me.loadContacts();
      });
    });
  }

  gotochat(contactId, userId) {
    this.router.navigate(['/dashboard/chat/' + contactId + '/' + userId]);
  }

  showBulkMsg() {
    var me = this;
    var checkedList = [];
    checkedList = me.contactsListShow.filter(function (el) {
      return el.check;
    });

    if (checkedList.length === 0) {
      alert('Please select contact list to send bulk msg!');
      return;
    }

    this.isShowSendBuldMsg = !this.isShowSendBuldMsg;
  }

  sendBulkMsg() {
    var me = this;
    var checkedList = [];
    checkedList = me.contactsListShow.filter(function (el) {
      return el.check;
    });

    checkedList.map(contactItem => {
      me.chatService.sendMsg({
        type: 'staffTouser',
        staffId: contactItem.staff,
        userId: contactItem.user_id,
        msg: me.bulkMsgStr
      });
    });

    me.bulkMsgStr = '';
    me.isShowSendBuldMsg = false;
  }

  assignStaff(contactId, staffId) {
    var me = this;
    var contactData = {
      staff : staffId
    };

    this.contactsService.updateContact(contactId, contactData).subscribe(data => {
      me.loadContacts();
    });
  }

  clickAdvance() {
    this.isAdvancedFiltering = !this.isAdvancedFiltering;
    if (!this.isAdvancedFiltering) {
      this.filter();
    }
  }
}
