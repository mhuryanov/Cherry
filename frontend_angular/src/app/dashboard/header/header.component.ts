import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';
import { ProfileService } from '../../shared/services/profile.service';
import { Profile } from '../../shared/modules/profile.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  activeURL = '/dashboard/home';
  profile: Profile;
  isLoadedProfile = false;

  constructor(
    private router: Router,
    private location: Location,
    private profileService: ProfileService
  ) {
    router.events.subscribe((val) => {
      console.log(location.path());
      this.activeURL = location.path();
    });

    profileService.getProfile().subscribe(data => {
      var me = this;
      this.profileService.getProfile().subscribe(data1 => {
        me.profile = {
          name: data1['data'][0].name,
          email: data1['data'][0].email,
          phone: data1['data'][0].phone,
          avartar: data1['data'][0].avartar,
          description: data1['data'][0].description
        };
        this.isLoadedProfile = true;
      });
    });
    
   }

  ngOnInit() {
  }

  goto(url) {
    this.router.navigate([url]);
  }

  logout() {
    this.router.navigate(['/login']);
  }

}
