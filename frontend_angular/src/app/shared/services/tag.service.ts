import { Injectable } from '@angular/core';
import { Tag } from '../modules/tag.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../modules/config.model';

@Injectable()
export class TagService {

  tagList = [];
  table_name = 'tags';
  token;
  header;
  constructor(
    private http: HttpClient
  ) {
    this.token = localStorage.getItem('token');
    this.header = new HttpHeaders({ 'token': this.token });
  }

  getTagList() {
    return this.http.get(config.baseURL + 'api/' + this.table_name, { headers: this.header });
  }

  addNewTag(newTag) {
    return this.http.post(config.baseURL + 'api/' + this.table_name, newTag, {headers: this.header});
  }

  editTag(editTag) {
    return this.http.put(config.baseURL + 'api/' + this.table_name + '/' + editTag.id, editTag, { headers: this.header });
  }

}
