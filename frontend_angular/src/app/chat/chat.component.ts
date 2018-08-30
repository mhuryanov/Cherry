import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../shared/services/contacts.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  
  userProfile = false;

  imageUrlArray = [
    'https://cdn-images-1.medium.com/max/2000/1*y3c9ggOkOzdAr8JC7TUrEQ@2x.png',
    'https://cdn.dribbble.com/users/575153/screenshots/3661919/thumb.gif'
  ];
  constructor(
    private contactService: ContactsService
  ) {
    var me = this;
    contactService.getUserProfile(1).subscribe(data => {
      console.log(data);
      if (data['error'] === 0) {
        me.userProfile = data['data'][0];
      }
    });
  }

  ngOnInit() {
  }

}
