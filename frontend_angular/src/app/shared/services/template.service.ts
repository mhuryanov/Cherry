import { Injectable } from '@angular/core';
import { Template } from '../modules/template.model';

@Injectable()
export class TemplateService {

  templateList = [];

  constructor() {
    const template1 = {
      id: '0',
      name: 'template1'
    };
    const template2 = {
      id: '2',
      name: 'template2'
    };

    this.templateList.push(template1);
    this.templateList.push(template2);
  }

  getTemplateList() {
    return this.templateList;
  }

}
