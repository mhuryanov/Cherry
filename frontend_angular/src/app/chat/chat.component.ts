import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../shared/services/contacts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TagService } from '../shared/services/tag.service';
import { StatusService } from '../shared/services/status.service';
import { ActionService } from '../shared/services/action.service';
import { StaffService } from '../shared/services/staff.service';
import { TemplateService } from '../shared/services/template.service';
import { ChatService } from '../shared/services/chat.service';
import { config } from '../shared/modules/config.model';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  contactId;
  userId;
  userProfile = false;
  userPhotos = [];
  userProductPayment = '';
  userSocialData = {
    isFacebookConnected : '-',
    isTwitterConnected : '-',
    isInstagramConnected : '-'
  };

  userInterestHobby = [];
  userInterestGame = [];
  userInterestMusic = [];
  userInterestSport = [];
  userInterestFood = [];
  userInterestDrink = [];
  userInterestBook = [];
  userInterestMovie = [];
  userHashTags = [];
  userTwitterHashTags = [];
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

  statusArray = [];

  actionArray = [];

  ratingArray = [0, 1, 2, 3, 4, 5];

  chatTime = 0;
  chartTimeMin = '0';
  chartTimeSec = '0';

  chatTimeIntervarl;

  staffArray = [];

  profileArray = [];



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
    

    this.staffService.getStaffList().subscribe(staffs => {
      me.staffArray = staffs['data'];
    });

    this.chatService.loadChatContent(this.staffId, this.userId).subscribe(chatContents => {
      chatContents['data'].map(chatItem => {
        var username = '';
        
          if (chatItem['message_type'] === 'userTostaff') {
            contactService.getUserProfile(chatItem['user_id']).subscribe(data => {
              if (data['error'] === 0 && data['data'].length > 0) {
                // me.userProfile = data['data'][0];
                // username = data['data'][0]['first_name'] + data['data'][0]['first_name'];
                // me.profileArray.push(data['data'][0]);
                var exist = false;
                me.profileArray.map(temp => {
                  if (temp.user_id === data['data'][0]['user_id']) {
                    exist = true;
                  }
                });
                if (!exist) {
                  me.profileArray.push(data['data'][0]);
                }
              }
            });
          }
        var role = localStorage.getItem('role');
        // alert(role);
        if (chatItem['user_id'].toString() === me.userId.toString() && role === '1') {
          me.chatContentsArray.push({
            type: chatItem['message_type'],
            staffId: chatItem['staff_id'],
            userId: chatItem['user_id'],
            msg: chatItem['message'],
            isMedia: chatItem['isMedia'] === 0 ? false : true
          });
        } else if (chatItem['user_id'].toString() === me.userId.toString() && role === '2') {
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
      // elmnt.scrollIntoView();
      setTimeout(() => {
        elmnt.scrollIntoView();
      }, 1000);
    });
    contactService.getUserProfile(this.userId).subscribe(data => {
      // console.log('userprofile');
      // console.log(data);
      if (data['error'] === 0) {
        me.userProfile = data['data'][0];
        me.profileArray.push(me.userProfile);
      }
    });

    contactService.getUserPhotos(this.userId).subscribe(data => {
      if (data['error'] === 0 && data['data'].length > 0) {
        me.userPhotos = data['data'];
        me.imageUrlArray = [];
        me.userPhotos.map(photo => {
          me.imageUrlArray.push(photo['name']);
        });
      }
    });

    contactService.getUserProductPayment(this.userId).subscribe(data => {
      if (data['error'] === 0 && data['data'].length > 0) {
        me.userProductPayment = data['data'][0]['order_status'];
      }
    });

    contactService.getUserSocialData(this.userId).subscribe(data => {
      // console.log(data);
      if (data['error'] === 0 && data['data'].length > 0) {
        data['data'].map(socialdata => {
          switch (socialdata['type']) {
            case 'facebook':
              me.userSocialData.isFacebookConnected = 'connected';
              break;
            case 'twitter':
              me.userSocialData.isTwitterConnected = 'connected';
              break;
            case 'instagram':
              me.userSocialData.isInstagramConnected = 'connected';
              break;
            default:
              break;
          }
        });
      }
    });

    contactService.getUserInterest(this.userId).subscribe(interests => {
      console.log(interests);
      if (interests['error'] === 0 && interests['data'].length > 0) {
        interests['data'].map(interest => {
          switch (interest['interest_type']) {
            case 'hobby':
              var hobby_ids = interest['interest_id'].split(',');
              hobby_ids.map(id => {
                me.userInterestHobby = [];
                me.contactService.getUserInterestHobby(id).subscribe(hobby => {
                  if (hobby['error'] === 0 && hobby['data'].length > 0) {
                    me.userInterestHobby.push(hobby['data'][0]);
                  }
                });
              });
              break;
            case 'game':
              var game_ids = interest['interest_id'].split(',');
              game_ids.map(id => {
                me.userInterestGame = [];
                me.contactService.getUserInterestGame(id).subscribe(game => {
                  if (game['error'] === 0 && game['data'].length > 0) {
                    me.userInterestGame.push(game['data'][0]);
                  }
                });
              });
              break;
            case 'music':
              var music_ids = interest['interest_id'].split(',');
              music_ids.map(id => {
                me.userInterestMusic = [];
                me.contactService.getUserInterestMusic(id).subscribe(music => {
                  if (music['error'] === 0 && music['data'].length > 0) {
                    me.userInterestMusic.push(music['data'][0]);
                  }
                });
              });
              break;
            case 'sport':
              var sport_ids = interest['interest_id'].split(',');
              sport_ids.map(id => {
                me.userInterestSport = [];
                me.contactService.getUserInterestSport(id).subscribe(sport => {
                  if (sport['error'] === 0 && sport['data'].length > 0) {
                    me.userInterestSport.push(sport['data'][0]);
                  }
                });
              });
              break;
            case 'food':
              var food_ids = interest['interest_id'].split(',');
              food_ids.map(id => {
                me.userInterestFood = [];
                me.contactService.getUserInterestFood(id).subscribe(food => {
                  if (food['error'] === 0 && food['data'].length > 0) {
                    me.userInterestFood.push(food['data'][0]);
                  }
                });
              });
              break;
            case 'drink':
              var drink_ids = interest['interest_id'].split(',');
              drink_ids.map(id => {
                me.userInterestDrink = [];
                me.contactService.getUserInterestDrink(id).subscribe(drink => {
                  if (drink['error'] === 0 && drink['data'].length > 0) {
                    me.userInterestDrink.push(drink['data'][0]);
                  }
                });
              });
              break;

            case 'book':
              var book_ids = interest['interest_id'].split(',');
              book_ids.map(id => {
                me.userInterestBook = [];
                me.contactService.getUserInterestBook(id).subscribe(book => {
                  if (book['error'] === 0 && book['data'].length > 0) {
                    me.userInterestBook.push(book['data'][0]);
                  }
                });
              });
              break;

            case 'movie':
              var moive_ids = interest['interest_id'].split(',');
              moive_ids.map(id => {
                me.userInterestMovie = [];
                me.contactService.getUserInterestMovie(id).subscribe(movie => {
                  if (movie['error'] === 0 && movie['data'].length > 0) {
                    me.userInterestMovie.push(movie['data'][0]);
                  }
                });
              });
              break;

            default:
              break;
          }
        });
      }
    });

    contactService.getUserHashCodes(this.userId).subscribe(hashcodes => {
      if (hashcodes['error'] === 0 && hashcodes['data'].length > 0) {
        console.log(hashcodes);
        var hastags = hashcodes['data'][0]['hash_tags'].split(',');
        var twitterhashtags = hashcodes['data'][0]['twitter_hashtags'].split(',');
        
        hastags.map(tag => {
          if (tag === '') {
            return;
          }
          me.contactService.getUserHashCode(tag).subscribe(tagInfo => {
            console.log(tagInfo);
            
            if (tagInfo['error'] === 0 && tagInfo['data'].length > 0) {
              me.userHashTags.push(tagInfo['data'][0]);
            }
          });
        });

        twitterhashtags.map(tag => {
          if (tag === '') {
            return;
          }
          me.contactService.getUserHashCode(tag).subscribe(tagInfo => {
            console.log(tagInfo);
            if (tagInfo['error'] === 0 && tagInfo['data'].length > 0) {
              me.userTwitterHashTags.push(tagInfo['data'][0]);
            }
          });
        });
      }
    });

    contactService.getContact(this.contactId).subscribe(data => {
      if (data['success'] === 1) {
        me.contactInfo = data['data'][0];
        // me.statusService.getStatusName(me.contactInfo['status']).subscribe(status => {
        //   me.contactInfo['status'] = status['data'][0];
        // });

        // me.actionService.getActionName(me.contactInfo['actions']).subscribe(action => {
        //   me.contactInfo['actions'] = action['data'][0];
        // });
        me.chatTime = me.contactInfo['time'];
        me.chartTimeMin = Math.floor(me.chatTime / 60).toString();
        me.chartTimeSec = (me.chatTime % 60).toString();

        me.chatTimeIntervarl =  setInterval(function () {
          me.chatTime++;
          me.chartTimeMin = Math.floor(me.chatTime / 60).toString();
          me.chartTimeSec = (me.chatTime % 60).toString();
          me.contactService.updateContact(me.contactId, {time: me.chatTime}).subscribe(data1 => {
            // console.log(data1);
          });
        }, 1000);

        me.staffService.getStaff(me.contactInfo['staff']).subscribe(staff => {
          me.contactInfo['staff'] = staff['data'][0];
          me.staffId = staff['data'][0]['id'];
          // me.contactService.updateContact(me.contactId, { status: 2}).subscribe(data1 => {
          //   if (data1['success'] === 1) {
              me.chatService.sendMsg({
                type: 'startChat',
                staffId: me.staffId,
                userId: me.userId
              });
          //   }
          // });
        });

        var tagIds = me.contactInfo['tags'].split(',');
        me.contactInfo['tagsArray'] = [];
        tagIds.map(tagId => {
          if (tagId.toString() !== '') {
            me.tagService.getTagName(tagId).subscribe(tag => {
              me.contactInfo['tagsArray'].push(tag['data'][0]);
            });
          }
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

    this.statusService.getStatusList().subscribe(data => {
      if (data['success'] === 1) {
        me.statusArray = data['data'];
      }
    });

    this.actionService.getActionList().subscribe(data => {
      if (data['success'] === 1) {
        me.actionArray = data['data'];
      }
    });
  }



  ngOnInit() {
    var me = this;
    this.chatService.messages.subscribe(msg => {
      // if ((msg.text.type === 'userTostaff' || msg.text.type === 'staffTouser') && msg.text.staffId.toString() === me.staffId.toString() && msg.text.userId.toString() === me.userId.toString()) {
      if ((msg.text.type === 'userTostaff' || msg.text.type === 'staffTouser') && me.userId.toString() === msg.text.userId.toString() ) {
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
    this.isAddTag = !this.isAddTag;
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
          type: 'staffTouser',
          staffId: me.staffId,
          userId: me.userId,
          msg: upload_url,
          isMedia: true
        };
        me.chatService.sendMsg(msgdata);
      });
    }
  }

  changeStatus() {
    this.contactService.updateContact(this.contactId, {status: this.contactInfo['status']}).subscribe(data => {
    });
  }

  changeAction() {
    this.contactService.updateContact(this.contactId, { actions: this.contactInfo['actions'] }).subscribe(data => {
    });
  }

  changeRating() {
    this.contactService.updateContact(this.contactId, { rating: this.contactInfo['rating'] }).subscribe(data => {
    });
  }

  removeTag(id) {
    var me = this;
    var contactData = {
      tags: ''
    };
    this.contactInfo['tagsArray'].map(tag => {
      if (tag.id.toString() !== id.toString()) {
        contactData.tags += tag.id.toString() + ',';
        me.showTagList.push(tag);
      }
    });
    if (contactData.tags !== '') {
      contactData.tags = contactData.tags.slice(0, -1);
    } else {
      me.contactInfo['tagsArray'] = [];
    }

    this.contactInfo['tags'] = contactData.tags;

    this.contactService.updateContact(this.contactId, contactData).subscribe(data => {
      me.contactInfo['tagsArray'].map((tag, index) => {
        if (tag.id.toString() !== id.toString()) {
          me.contactInfo['tagsArray'].splice(index, 1);
          return;
        }
      });
      me.clickAddTag();
      me.isAddTag = false;
    });
  }

  ngOnDestroy() {
    clearInterval(this.chatTimeIntervarl);
  }
}
