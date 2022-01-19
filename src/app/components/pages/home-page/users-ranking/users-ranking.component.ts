import {Component, OnInit} from '@angular/core';
import {UserScore} from "../../../../models/user-score";
import {UsersService} from "../../../../services/users/users.service";

@Component({
  selector: 'app-users-ranking',
  templateUrl: './users-ranking.component.html',
  styleUrls: ['./users-ranking.component.scss']
})
export class UsersRankingComponent implements OnInit {
  public topUsers: UserScore[];

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.usersService.getTopUsers(10).subscribe(users => {
      this.topUsers = users;
    }, () => {});
  }

}
