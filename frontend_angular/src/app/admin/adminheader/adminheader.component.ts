import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.scss']
})
export class AdminheaderComponent implements OnInit {

  activeURL = '/dashboard/admin/managestaff';

  constructor(
    private router: Router,
    private location: Location
  ) {
      router.events.subscribe((val) => {
      console.log(location.path());
      this.activeURL = location.path();
    });
  }

  ngOnInit() {
  }

  goto(url) {
    this.router.navigate([url]);
  }

}
