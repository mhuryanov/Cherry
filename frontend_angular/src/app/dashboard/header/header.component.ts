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
  profile;
  isLoadedProfile = false;
  profilesubscribe;

  constructor(
    private router: Router,
    private location: Location,
    private profileService: ProfileService
  ) {
    router.events.subscribe((val) => {
      this.activeURL = location.path();
    });

    profileService.getProfile().subscribe(data => {
      var me = this;
      this.profilesubscribe = this.profileService.getProfile().subscribe(data1 => {
        me.profile = {
          name: data1['data'][0].name,
          email: data1['data'][0].email,
          phone: data1['data'][0].phone,
          avartar: data1['data'][0].avartar,
          description: data1['data'][0].description,
          role: data1['data'][0].role
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
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // ngOnDestroy() {
  //   this.profilesubscribe.unsubscribe();
  // }

}
