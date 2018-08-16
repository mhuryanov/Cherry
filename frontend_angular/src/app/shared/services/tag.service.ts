import { Injectable } from '@angular/core';
import { Tag } from '../modules/tag.model';

@Injectable()
export class TagService {

  tagList = [];

  constructor() {
    const tag1 = {
      id: '0',
      name: 'tag1'
    };
    const tag2 = {
      id: '2',
      name: 'tag2'
    };

    this.tagList.push(tag1);
    this.tagList.push(tag2);

  }

  getTagList() {
    return this.tagList;
  }

}
