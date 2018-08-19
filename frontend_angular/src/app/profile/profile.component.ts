import { Component, OnInit } from '@angular/core';
import { Profile } from '../shared/modules/profile.model';
import { ProfileService } from '../shared/services/profile.service';
import { config } from '../shared/modules/config.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  editprofile: Profile;
  changePassword = {
    current: '',
    confirm: '',
    new: '',
    id: ''
  };

  isChangePassword = false;
  isEditProfile = false;
  isLoadedProfile = false;
  isNotMatchedPasswords = false;
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

  clickEditProfile() {
    this.isEditProfile = true;
    this.editprofile = {
      name: this.profile.name,
      email: this.profile.email,
      phone: this.profile.phone,
      avartar: this.profile.avartar,
      description: this.profile.description
    };
  }

  clickSaveProfile() {
    this.profileService.editProfile(this.editprofile).subscribe(data => {
      console.log(data);
      if (data.success === 1) {
        location.reload();
      }
    });
  }

  clickChangePassword() {
    if (this.changePassword.new !== this.changePassword.confirm) {
      this.isNotMatchedPasswords = true;
      return;
    }
    this.changePassword.id = this.profileService.id;
    var me = this;
    this.profileService.changePassword(this.changePassword).subscribe(data => {
      if (data.error === 1) {
        me.isChangePassword = false;
      }
    });
  }

  clickCancelChangePassword() {
    this.isChangePassword = false;
    this.changePassword = {
      current: '',
      confirm: '',
      new: '',
      id: this.profileService.id
    };
  }

  clickChangeAvartar() {
    document.getElementById('profile-imgage-upload').click();
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('photo', file, file.name);

      this.profileService.uploadProfileImage(formData).subscribe((data: any) => {
        this.profile.avartar = config.baseURL + data.url;
        this.profileService.editProfile(this.profile).subscribe(data => {
          // location.reload();
        });
      });
    }
  }

}
