import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user/user.service";
import {LoginData} from "../../../../models/login-data";
import {MatDialog} from "@angular/material/dialog";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  public loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    },
    {
      updateOn: 'submit'
    }
  );

  public showMessageServerError = false;
  public showMessageBadEmailOrPassword = false;
  public submitted = false;

  constructor(private userService: UserService,
              private matDialog: MatDialog,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  public login(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.clearMessages();
    const loginData = this.getLoginData();
    this.userService.login(loginData).subscribe((userData) => {
      localStorage.setItem('user', JSON.stringify(userData));
      window.location.href = '';
      this.matDialog.closeAll();
    }, (error) => {
      if (error.status == 401) {
        this.showMessageBadEmailOrPassword = true;
      } else {
        this.showMessageServerError = true;
      }
    });
  }

  private getLoginData(): LoginData {
    return new LoginData(this.email?.value, this.password?.value);
  }

  private clearMessages(): void {
    this.showMessageBadEmailOrPassword = false;
    this.showMessageServerError = false;
  }

  get email(): AbstractControl | null {
    return this.loginForm.get('email');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

}
