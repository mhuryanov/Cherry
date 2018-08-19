import { Injectable } from '@angular/core';
import { Action } from '../modules/action.model';

@Injectable()
export class ActionService {

  actionList = [];

  constructor() {
    
   }

  getActionList() {
    return this.actionList;
  }

}
