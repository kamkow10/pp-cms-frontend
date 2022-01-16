import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {UserData} from "../../../models/user-data";
import {UsersService} from "../../../services/users/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.scss']
})
export class UserListPageComponent implements OnInit {
  public userSearchForm = this.fb.group({
      username: ['', Validators.required]
    },
    {
      updateOn: "submit"
    }
  );
  public submitted = false;
  public foundedUsers: UserData[] = [];

  constructor(private fb: FormBuilder,
              private usersService: UsersService,
              private router: Router) {
  }

  ngOnInit(): void {

  }

  public searchUser(): void {
    this.submitted = true;
    if (this.userSearchForm.invalid) {
      return;
    }
    this.usersService.findUsers(this.username?.value).subscribe((users) => {
      this.foundedUsers = users;
      this.getCommentsCountForUsers()
    }, () => {});
  }

  public goToUserProfile(userId: number): void {
    this.router.navigateByUrl(`user/${userId}`);
  }

  get username(): AbstractControl | null {
    return this.userSearchForm.get('username');
  }

  private getCommentsCountForUsers(): void {
    if (this.foundedUsers.length) {
      this.foundedUsers.forEach((user) => {
        this.usersService.getUserComments(user.id).subscribe((comments) => {
          user.commentsCount = comments.length;
        })
      })
    }
  }
}
