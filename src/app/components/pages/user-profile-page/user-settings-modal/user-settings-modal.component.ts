import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user/user.service";
import {
  ERROR_EMAIL_IN_USE,
  ERROR_NICKNAME_IN_USE,
  ERROR_OK,
  ERROR_WRONG_PASSWORD
} from "../../../../consts/error.const";

@Component({
  selector: 'app-user-settings-modal',
  templateUrl: './user-settings-modal.component.html',
  styleUrls: ['./user-settings-modal.component.scss']
})
export class UserSettingsModalComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit(): void {
  }

  // Email form -----------------------------------------------------

  public changeEmailForm = this.fb.group({
    newEmail: ['', [Validators.required, Validators.email]],
    newEmailConfirm: ['', Validators.required]
  }, {
    updateOn: 'submit'
  });
  public changeEmailFormSubmitted = false;
  public changeEmailFormSucceed = false;
  public changeEmailFormEmailInUse = false;
  public changeEmailFormServerError = false;

  public changeEmail(): void {
    this.changeEmailFormSubmitted = true;
    this.changeEmailFormSucceed = false;
    this.changeEmailFormEmailInUse = false;
    this.changeEmailFormServerError = false;
    if (this.changeEmailForm.invalid) {
      return;
    }
    this.userService.editEmail(this.newEmail?.value).subscribe((response) => {
      if (response.error != ERROR_OK) {
        if (response.error == ERROR_EMAIL_IN_USE) {
          this.changeEmailFormEmailInUse = true;
        } else {
          this.changeEmailFormServerError = true;
        }
      } else {
        this.changeEmailFormSubmitted = false;
        this.changeEmailFormSucceed = true;
      }
    }, () => {
      this.changeEmailFormServerError = true;
    });
  }

  get newEmail(): AbstractControl | null {
    return this.changeEmailForm.get('newEmail');
  }

  get newEmailConfirm(): AbstractControl | null {
    return this.changeEmailForm.get('newEmailConfirm');
  }

  // Username form -----------------------------------------------------

  public changeUsernameForm = this.fb.group({
    newUsername: ['', Validators.required]
  }, {
    updateOn: 'submit'
  });
  public changeUsernameFormSubmitted = false;
  public changeUsernameFormSucceed = false;
  public changeUsernameFormUsernameInUse = false;
  public changeUsernameFormServerError = false;

  public changeUsername(): void {
    this.changeUsernameFormSubmitted = true;
    this.changeUsernameFormSucceed = false;
    this.changeUsernameFormUsernameInUse = false;
    this.changeUsernameFormServerError = false;
    if (this.changeUsernameForm.invalid) {
      return;
    }
    this.userService.editUsername(this.newUsername?.value).subscribe((response) => {
      if (response.error != ERROR_OK) {
        if (response.error == ERROR_NICKNAME_IN_USE) {
          this.changeUsernameFormUsernameInUse = true;
        } else {
          this.changeUsernameFormServerError = true;
        }
      } else {
        this.changeUsernameFormSubmitted = false;
        this.changeUsernameFormSucceed = true;
      }
    }, () => {
      this.changeUsernameFormServerError = true;
    });
  }

  get newUsername(): AbstractControl | null {
    return this.changeUsernameForm.get('newUsername');
  }


  // Password form -----------------------------------------------------

  public changePasswordForm = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    newPasswordConfirm: ['', Validators.required]
  }, {
    updateOn: 'submit'
  });
  public changePasswordFormSubmitted = false;
  public changePasswordFormSucceed = false;
  public changePasswordFormWrongOldPassword = false;
  public changePasswordFormServerError = false;

  public changePassword(): void {
    this.changePasswordFormSubmitted = true;
    this.changePasswordFormSucceed = false;
    this.changePasswordFormWrongOldPassword = false;
    this.changePasswordFormServerError = false;
    if (this.changePasswordForm.invalid) {
      return;
    }
    this.userService.editPassword(this.oldPassword?.value, this.newPassword?.value).subscribe((response) => {
      if (response.error != ERROR_OK) {
        if (response.error == ERROR_WRONG_PASSWORD) {
          this.changePasswordFormWrongOldPassword = true;
        } else {
          this.changePasswordFormServerError = true;
        }
      } else {
        this.changePasswordFormSubmitted = false;
        this.changePasswordFormSucceed = true;
      }
    }, () => {
      this.changePasswordFormServerError = true;
    });
  }

  get newPassword(): AbstractControl | null {
    return this.changePasswordForm.get('newPassword');
  }

  get newPasswordConfirm(): AbstractControl | null {
    return this.changePasswordForm.get('newPasswordConfirm');
  }

  get oldPassword(): AbstractControl | null {
    return this.changePasswordForm.get('oldPassword');
  }


}
