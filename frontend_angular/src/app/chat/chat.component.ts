import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  imageUrlArray = [
    'https://cdn-images-1.medium.com/max/2000/1*y3c9ggOkOzdAr8JC7TUrEQ@2x.png',
    'https://cdn.dribbble.com/users/575153/screenshots/3661919/thumb.gif'
  ];
  constructor() { }

  ngOnInit() {
  }

}
