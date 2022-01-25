import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {PRIVILEGES} from "../../../consts/privilege.const";

@Component({
  selector: 'app-cms-page',
  templateUrl: './cms-page.component.html',
  styleUrls: ['./cms-page.component.scss']
})
export class CmsPageComponent implements OnInit {
  public selectedBoard = 'myArticles';
  public hasAccessToReadAllArticles: boolean;

  constructor(private userService: UserService) {
    this.hasAccessToReadAllArticles = this.userService.hasPrivilege(PRIVILEGES.READ_CMS_USERS);
  }

  ngOnInit(): void {
  }

}
