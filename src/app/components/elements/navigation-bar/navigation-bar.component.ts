import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginModalComponent} from "./login-modal/login-modal.component";
import {RegisterModalComponent} from "./register-modal/register-modal.component";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, AfterViewInit {
  @Input() public hideOnTop = false;
  @ViewChild('header') header: ElementRef<HTMLElement>;

  constructor(private matDialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (!this.hideOnTop) {
      this.header.nativeElement.setAttribute('style', 'background-color: #202020');
    }
  }

  public openLoginModal(): void {
    this.matDialog.open(LoginModalComponent, {width: '30%'});
  }

  public openRegisterModal(): void {
    this.matDialog.open(RegisterModalComponent, {width: '30%'});
  }

}
