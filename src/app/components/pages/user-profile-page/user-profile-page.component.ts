import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserData} from "../../../models/user-data";
import {UsersService} from "../../../services/users/users.service";
import {CommentData} from "../../../models/comment-data";
import {MatDialog} from "@angular/material/dialog";
import {UserSettingsModalComponent} from "./user-settings-modal/user-settings-modal.component";

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.scss']
})
export class UserProfilePageComponent implements OnInit {
  public user: UserData;
  public comments: CommentData[];

  constructor(private route: ActivatedRoute,
              private usersService: UsersService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.params.id;
    this.usersService.getUserData(userId).subscribe((userData) => {
      this.user = userData;
      this.usersService.getUserComments(this.user.id).subscribe((comments) => {
        this.comments = comments;
        this.user.commentsCount = comments.length;
      }, () => {});
    }, () => {});
  }

  public openUserSettingsModal(): void {
    this.matDialog.open(UserSettingsModalComponent, {width: '40%'}).afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }

}
