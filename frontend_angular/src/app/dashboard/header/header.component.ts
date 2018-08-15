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

  constructor(
    private router: Router,
    private location: Location,
    private profileService: ProfileService
  ) {
    router.events.subscribe((val) => {
      console.log(location.path());
      this.activeURL = location.path();
    });

    this.profile = profileService.getProfile();
    console.log(this.profile);
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
