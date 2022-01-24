import { Component, OnInit } from '@angular/core';
import {UserData} from "../../../../models/user-data";
import {UsersService} from "../../../../services/users/users.service";
import {MatDialog} from "@angular/material/dialog";
import {EditUserModalComponent} from "../cms-users/edit-user-modal/edit-user-modal.component";

@Component({
  selector: 'app-cms-administration-users',
  templateUrl: './cms-administration-users.component.html',
  styleUrls: ['./cms-administration-users.component.scss']
})
export class CmsAdministrationUsersComponent implements OnInit {
  public users: UserData[];
  public usersDisplayedColumns = ['id', 'username', 'email', 'role']

  constructor(private usersService: UsersService,
              private matDialog: MatDialog) {
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
