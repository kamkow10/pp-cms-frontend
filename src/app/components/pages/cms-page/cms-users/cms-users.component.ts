import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../../services/users/users.service";
import {UserData} from "../../../../models/user-data";
import {MatDialog} from "@angular/material/dialog";
import {EditUserModalComponent} from "./edit-user-modal/edit-user-modal.component";

@Component({
  selector: 'app-cms-users',
  templateUrl: './cms-users.component.html',
  styleUrls: ['./cms-users.component.scss']
})
export class CmsUsersComponent implements OnInit {
  public users: UserData[];
  public usersDisplayedColumns = ['id', 'username', 'email']

  constructor(private usersService: UsersService,
              private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(users => {
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
