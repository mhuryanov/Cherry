import { Component, OnInit } from '@angular/core';
import { TemplateService } from '../../shared/services/template.service';
import { Template } from '../../shared/modules/template.model';

@Component({
  selector: 'app-managetemplates',
  templateUrl: './managetemplates.component.html',
  styleUrls: ['./managetemplates.component.scss']
})
export class ManagetemplatesComponent implements OnInit {

  templateList = [];
  newTemplate;
  editTemplate: Template;
  viewStatus = 0; // 0 : list, 1: add new, 2: edit

  constructor(
    private templateService: TemplateService
  ) {
    var me = this;
    templateService.getTemplateList().subscribe(data => {
      data.data.map(template => {
        me.templateList.push(template);
      });
    });
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

  clickAddNewTemplate() {
    var me = this;
    this.templateService.addNewTemplate(this.newTemplate).subscribe(data => {
      me.viewStatus = 0;
      me.templateList = [];
      me.templateService.getTemplateList().subscribe(data1 => {
        data1.data.map(template => {
          me.templateList.push(template);
        });
      });
    });
  }

  clickSaveTemplate() {
    var me = this;
    this.templateService.editTemplate(this.editTemplate).subscribe(data => {
      me.viewStatus = 0;
      me.templateList = [];
      me.templateService.getTemplateList().subscribe(data1 => {
        data1.data.map(template => {
          me.templateList.push(template);
        });
      });
    });
  }

}
