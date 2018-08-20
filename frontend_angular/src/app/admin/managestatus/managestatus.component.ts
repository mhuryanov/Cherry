import { Component, OnInit } from '@angular/core';
import { Status } from '../../shared/modules/status.model';
import { StatusService } from '../../shared/services/status.service';

@Component({
  selector: 'app-managestatus',
  templateUrl: './managestatus.component.html',
  styleUrls: ['./managestatus.component.scss']
})
export class ManagestatusComponent implements OnInit {

  statusList = [];
  newStatus;
  editStatus: Status;
  viewStatus = 0; // 0 : list, 1: add new, 2: edit

  constructor(
    private statusService: StatusService
  ) {
    var me = this;
    statusService.getStatusList().subscribe(data => {
      data['data'].map(status => {
        me.statusList.push(status);
      });
    });
  }

  ngOnInit() {
  }

  addnewStatusClick() {
    this.viewStatus = 1;
    this.newStatus = {
      name: ''
    };
  }

  editStatusClick(statusId) {
    this.viewStatus = 2;
    const me = this;
    this.statusList.map(status => {
      if (status.id === statusId) {
        me.editStatus = status;
      }
    });
  }

  clickAddNewStatus() {
    var me = this;
    this.statusService.addNewStatus(this.newStatus).subscribe(data => {
      me.viewStatus = 0;
      me.statusList = [];
      me.statusService.getStatusList().subscribe(data1 => {
        data1['data'].map(status => {
          me.statusList.push(status);
        });
      });
    });
  }

  clickSaveStatus() {
    var me = this;
    this.statusService.editStatus(this.editStatus).subscribe(data => {
      me.viewStatus = 0;
      me.statusList = [];
      me.statusService.getStatusList().subscribe(data1 => {
        data1['data'].map(status => {
          me.statusList.push(status);
        });
      });
    });
  }

}
