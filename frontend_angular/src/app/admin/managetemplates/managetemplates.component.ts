import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../shared/services/template.service';
import { Template } from '../../shared/modules/template.model';

@Component({
  selector: 'app-managetemplates',
  templateUrl: './managetemplates.component.html',
  styleUrls: ['./managetemplates.component.scss']
})
export class ManagetemplatesComponent implements OnInit {

  templateList: Template[];
  newTemplate;
  editTemplate: Template;
  viewStatus = 0; // 0 : list, 1: add new, 2: edit

  constructor(
    private templateService: TemplateService
  ) {
    this.templateList = templateService.getTemplateList();
   }

  ngOnInit() {
  }

  addnewTemplateClick() {
    this.viewStatus = 1;
    this.newTemplate = {
      name: ''
    };
  }

  editTemplateClick(templateId) {
    this.viewStatus = 2;
    const me = this;
    this.templateList.map(template => {
      if (template.id === templateId) {
        me.editTemplate = template;
      }
    });
  }

}
