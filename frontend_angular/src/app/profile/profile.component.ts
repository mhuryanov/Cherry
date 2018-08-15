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
  testModel = 'aaa';

  isChangePassword = false;
  isEditProfile = false;
  constructor(
    private profileService: ProfileService
  ) {
    this.profile = this.profileService.getProfile();
   }

  ngOnInit() {
  }

}
