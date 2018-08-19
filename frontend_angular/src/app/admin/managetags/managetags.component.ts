import { Component, OnInit } from '@angular/core';
import { TagService } from '../../shared/services/tag.service';
import { Tag } from '../../shared/modules/tag.model';

@Component({
  selector: 'app-managetags',
  templateUrl: './managetags.component.html',
  styleUrls: ['./managetags.component.scss']
})
export class ManagetagsComponent implements OnInit {

  tagList = [];
  newTag;
  editTag: Tag;
  viewStatus = 0; // 0 : list, 1: add new, 2: edit

  constructor(
    private tagService: TagService
  ) {
    var me = this;
    tagService.getTagList().subscribe(data => {
      data.data.map(tag => {
        me.tagList.push(tag);
      });
    });
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

  clickAddNewTag () {
    var me = this;
    this.tagService.addNewTag(this.newTag).subscribe(data => {
      me.viewStatus = 0;
      me.tagList = [];
      me.tagService.getTagList().subscribe(data1 => {
        data1.data.map(tag => {
          me.tagList.push(tag);
        });
      });
    });
  }

  clickSaveTag() {
    var me = this;
    this.tagService.editTag(this.editTag).subscribe(data => {
      me.viewStatus = 0;
      me.tagList = [];
      me.tagService.getTagList().subscribe(data1 => {
        data1.data.map(tag => {
          me.tagList.push(tag);
        });
      });
    });
  }

}
