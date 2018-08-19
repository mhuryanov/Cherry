import { Component, OnInit } from '@angular/core';
import { Action } from '../../shared/modules/action.model';
import { ActionService } from '../../shared/services/action.service';


@Component({
  selector: 'app-manageactions',
  templateUrl: './manageactions.component.html',
  styleUrls: ['./manageactions.component.scss']
})
export class ManageactionsComponent implements OnInit {

  actionList: Action[];
  newAction;
  editAction: Action;
  viewStatus = 0; // 0 : list, 1: add new, 2: edit

  constructor(
    private actionService: ActionService
  ) {
    var me = this;
    actionService.getActionList().subscribe(data => {
      data.data.map(action => {
        me.actionList.push(action);
      });
    });
   }

  ngOnInit() {
  }

  addnewActionClick() {
    this.viewStatus = 1;
    this.newAction = {
      name: ''
    };
  }

  editActionClick(actionId) {
    this.viewStatus = 2;
    const me = this;
    this.actionList.map(action => {
      if (action.id === actionId) {
        me.editAction = action;
      }
    });
  }

}
