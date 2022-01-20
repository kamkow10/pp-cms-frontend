import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginModalComponent} from "./login-modal/login-modal.component";
import {RegisterModalComponent} from "./register-modal/register-modal.component";
import {UserService} from "../../../services/user/user.service";
import {Router} from "@angular/router";
import {UserData} from "../../../models/user-data";
import {TranslationService} from "../../../services/translation/translation.service";
import {Language} from "../../../models/language";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, AfterViewInit {
  @Input() public hideOnTop = false;
  @ViewChild('header') header: ElementRef<HTMLElement>;
  public isLoggedIn: boolean;
  public loggedUser: UserData | null;
  public isCMSUser: boolean;
  public currentUrl: string;
  public currentLang: string;
  public langs: Language[];

  constructor(private matDialog: MatDialog,
              private userService: UserService,
              private router: Router,
              private translationService: TranslationService) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.userService.isLoggedIn();
    this.loggedUser = this.userService.userData;
    this.isCMSUser = false;
    this.currentUrl = this.router.url;
    this.currentLang = this.translationService.currentLang;
    this.translationService.getLanguages().subscribe(languages => {
      this.langs = languages;
    });
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

  public logout(): void {
    this.userService.logout().subscribe(() => {
      this.userService.userData = null;
      localStorage.clear();
      window.location.href = '#home';
    }, (error) => {
      console.log(error);
    });
  }

  public async setLanguage(languageName: string): Promise<void> {
    await this.translationService.setLanguage(languageName);
  }
}
