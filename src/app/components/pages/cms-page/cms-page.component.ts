import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-cms-page',
  templateUrl: './cms-page.component.html',
  styleUrls: ['./cms-page.component.scss']
})
export class CmsPageComponent implements OnInit {
  public selectedBoard = 'dashboard';

  constructor() {
  }

  ngOnInit(): void {
  }

}
