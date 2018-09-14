import { Injectable } from '@angular/core';
import { Template } from '../modules/template.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../modules/config.model';

@Injectable()
export class TemplateService {

  templateList = [];
  table_name = 'templates';
  token;
  header;

  constructor(
    private http: HttpClient
  ) {
    this.token = localStorage.getItem('token');
    this.header = new HttpHeaders({ 'token': this.token });
  }

  getTemplateList() {
    return this.http.get(config.baseURL + 'api/' + this.table_name, { headers: this.header });
  }

  addNewTemplate(newTemplate) {
    return this.http.post(config.baseURL + 'api/' + this.table_name, newTemplate, { headers: this.header });
  }

  editTemplate(editTemplate) {
    return this.http.put(config.baseURL + 'api/' + this.table_name + '/' + editTemplate.id, editTemplate, { headers: this.header });
  }

  deleteTemplate(templateId) {
    return this.http.delete(config.baseURL + 'api/' + this.table_name + '/' + templateId, { headers: this.header });
  }

}
