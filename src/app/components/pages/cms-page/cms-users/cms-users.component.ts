import {Component, OnInit} from '@angular/core';
import {UsersService} from "../../../../services/users/users.service";
import {UserData} from "../../../../models/user-data";

@Component({
  selector: 'app-cms-users',
  templateUrl: './cms-users.component.html',
  styleUrls: ['./cms-users.component.scss']
})
export class CmsUsersComponent implements OnInit {
  public users: UserData[];
  public usersDisplayedColumns = ['id', 'username', 'email']

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(users => {
      this.users = users;
    })
  }

  public editUser(id: number) {

  }

  public deleteUser(id: number) {
    this.usersService.deleteUser(id).subscribe(() => {
      this.ngOnInit();
    })
  }

}
