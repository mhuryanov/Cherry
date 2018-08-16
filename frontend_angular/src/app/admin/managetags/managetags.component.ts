import { Component, OnInit } from '@angular/core';
import { TagService } from '../../shared/services/tag.service';
import { Tag } from '../../shared/modules/tag.model';

@Component({
  selector: 'app-managetags',
  templateUrl: './managetags.component.html',
  styleUrls: ['./managetags.component.scss']
})
export class ManagetagsComponent implements OnInit {

  tagList: Tag[];
  newTag;
  editTag: Tag;
  viewStatus = 0; // 0 : list, 1: add new, 2: edit

  constructor(
    private tagService: TagService
  ) {
    this.tagList = tagService.getTagList();
  }

  ngOnInit() {
  }

  addnewTagClick() {
    this.viewStatus = 1;
    this.newTag = {
      name: ''
    };
  }

  editTagClick(tagId) {
    this.viewStatus = 2;
    const me = this;
    this.tagList.map(tag => {
      if (tag.id ===  tagId) {
        me.editTag = tag;
      }
    });
  }

}
