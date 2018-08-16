import { Component, OnInit } from '@angular/core';
import { Status } from '../../shared/modules/status.model';
import { StatusService } from '../../shared/services/status.service';

@Component({
  selector: 'app-managestatus',
  templateUrl: './managestatus.component.html',
  styleUrls: ['./managestatus.component.scss']
})
export class ManagestatusComponent implements OnInit {

  statusList: Status[];
  newStatus;
  editStatus: Status;
  viewStatus = 0; // 0 : list, 1: add new, 2: edit

  constructor(
    private statusService: StatusService
  ) {
    this.statusList = statusService.getStatusList();
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

}
