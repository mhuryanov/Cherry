import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../shared/services/contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  contactsList = [];
  constructor(
    private contactsService: ContactsService
  ) {
    var me = this;
    this.contactsService.getContacts().subscribe(data => {
      console.log(data);
      if (data.error === 0) {
        me.contactsList = data.data;
      }
    });
   }

  ngOnInit() {
  }

}
