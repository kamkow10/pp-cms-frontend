import {Component, OnInit} from '@angular/core';
import {UserData} from "../../../../models/user-data";
import {UsersService} from "../../../../services/users/users.service";
import {MatDialog} from "@angular/material/dialog";
import {EditUserModalComponent} from "../cms-users/edit-user-modal/edit-user-modal.component";
import {UserService} from "../../../../services/user/user.service";
import {PRIVILEGES} from "../../../../consts/privilege.const";

@Component({
  selector: 'app-cms-administration-users',
  templateUrl: './cms-administration-users.component.html',
  styleUrls: ['./cms-administration-users.component.scss']
})
export class CmsAdministrationUsersComponent implements OnInit {
  public users: UserData[];
  public usersDisplayedColumns = ['id', 'username', 'email', 'role'];
  public hasAccessToModifyCmsUsers: boolean;

  constructor(private usersService: UsersService,
              private userService: UserService,
              private matDialog: MatDialog) {
    this.hasAccessToModifyCmsUsers = this.userService.hasPrivilege(PRIVILEGES.ADMIN_USERS_PRIVILEGE_ACCESS);
  }

  ngOnInit(): void {
    this.usersService.getCmsUsers().subscribe(users => {
      this.users = users;
    })
  }

  public editUser(id: number) {
    this.matDialog.open(EditUserModalComponent, {width: '50%', data: {editingUserId: id}}).afterClosed().subscribe(() => {
      this.ngOnInit();
    })
  }

  public deleteUser(id: number) {
    this.usersService.deleteUser(id).subscribe(() => {
      this.ngOnInit();
    })
  }

}
