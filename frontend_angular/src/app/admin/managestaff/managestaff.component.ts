import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { StaffService } from '../../shared/services/staff.service';
import { Staff } from '../../shared/modules/staff.model';


@Component({
  selector: 'app-managestaff',
  templateUrl: './managestaff.component.html',
  styleUrls: ['./managestaff.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ManagestaffComponent implements OnInit {

  staffList: Staff[];
  newStaff;
  editStaff;

  viewStatus = 0; // 0: list, 1: add, 2: edit

  constructor(
    private staffService: StaffService,
  ) {
    this.staffList = staffService.getStaffList();
    console.log(this.staffList);
  }

  ngOnInit() {
  }

  addnewStaff() {
    this.viewStatus = 1;
    this.newStaff = {
      name: '',
      email: '',
      phone: '',
      avartar: '../assets/default-user.png',
      description: '',
      role: 2
    };
  }

  cancelStaffAdd() {
    this.viewStatus = 0;
  }

  editStaffClick(staffId) {
    this.viewStatus = 2;
    var me = this;
    this.staffList.map(staff => {
      if (staff.id === staffId) {
        me.editStaff = staff;
        console.log(staff);
      }
    });
  }

  cancelStaffEdit() {
    this.viewStatus = 0;
  }


}
