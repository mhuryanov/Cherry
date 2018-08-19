import { Component, OnInit } from '@angular/core';
import { Profile } from '../shared/modules/profile.model';
import { ProfileService } from '../shared/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: Profile;

  isChangePassword = false;
  isEditProfile = false;
  isLoadedProfile = false;
  constructor(
    private profileService: ProfileService
  ) {
    var me  = this;
    this.profileService.getProfile().subscribe(data => {
      me.profile = {
        name: data.data[0].name,
        email: data.data[0].email,
        phone: data.data[0].phone,
        avartar: data.data[0].avartar,
        description: data.data[0].description
      };
      this.isLoadedProfile = true;
    });
   }

  ngOnInit() {
  }

}
