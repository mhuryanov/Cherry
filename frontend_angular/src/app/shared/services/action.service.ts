import { Injectable } from '@angular/core';
import { Action } from '../modules/action.model';

@Injectable()
export class ActionService {

  actionList = [];

  constructor() {
    const action1 = {
      id: '0',
      name: 'Action1'
    };
    const action2 = {
      id: '2',
      name: 'action2'
    };

    this.actionList.push(action1);
    this.actionList.push(action2);
   }

  getActionList() {
    return this.actionList;
  }

}
