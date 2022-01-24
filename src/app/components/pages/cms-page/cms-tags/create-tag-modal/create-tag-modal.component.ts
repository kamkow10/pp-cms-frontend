import {Component, Inject, OnInit} from '@angular/core';
import {Tag} from "../../../../../models/tag";
import {TagService} from "../../../../../services/tag/tag.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ERROR_OK, ERROR_TAG_IN_USE} from "../../../../../consts/error.const";

@Component({
  selector: 'app-create-tag-modal',
  templateUrl: './create-tag-modal.component.html',
  styleUrls: ['./create-tag-modal.component.scss']
})
export class CreateTagModalComponent implements OnInit {
  public showMessageServerError = false;
  public showMessageTagInUse = false;
  public tagName = '';

  public editMode = false;
  public editingTag: Tag;

  constructor(private tagService: TagService,
              private matDialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: {editingTagId: number, language: string}) {
    this.editMode = this.data.editingTagId != null;
  }

  ngOnInit(): void {
    if (!this.editMode) {

    } else {
      this.tagService.getTag(this.data.editingTagId).subscribe(tag => {
        this.editingTag = tag;
        this.tagName = tag.name;
      });
    }
  }

  public createTag(): void {
    this.tagService.createTag(this.tagName, this.data.language).subscribe(response => {
      if (response.error != ERROR_OK) {
        if (response.error == ERROR_TAG_IN_USE) {
          this.showMessageTagInUse = true;
        } else {
          this.showMessageServerError = true;
        }
      } else {
        this.matDialog.closeAll();
      }
    }, () => {
      this.showMessageServerError = true;
    })
  }

  public editTag(): void {
    this.tagService.editTag(this.editingTag.id, this.tagName).subscribe(response => {
      if (response.error != ERROR_OK) {
        if (response.error == ERROR_TAG_IN_USE) {
          this.showMessageTagInUse = true;
        } else {
          this.showMessageServerError = true;
        }
      } else {
        this.matDialog.closeAll();
      }
    }, () => {
      this.showMessageServerError = true;
    })
  }
}
