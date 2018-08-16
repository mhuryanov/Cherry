import { Injectable } from '@angular/core';
import { Status } from '../modules/status.model';

@Injectable()
export class StatusService {

  statusList = [];

  constructor() {
    const status1 = {
      id: '0',
      name: 'status1'
    };
    const status2 = {
      id: '2',
      name: 'status2'
    };

    this.statusList.push(status1);
    this.statusList.push(status2);
  }

  getStatusList() {
    return this.statusList;
  }

}
