import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-comment-dialog',
  templateUrl: './delete-comment-dialog.component.html',
  styleUrls: ['./delete-comment-dialog.component.scss']
})
export class DeleteCommentDialogComponent implements OnInit {
  public showMessageServerError = false;
  @Input() public comment: Comment;

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  public deleteComment(): void {
    this.matDialog.getDialogById('deleteComment')?.close('delete');
  }

}
