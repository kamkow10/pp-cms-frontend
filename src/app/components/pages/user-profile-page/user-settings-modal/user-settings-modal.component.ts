import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user/user.service";
import {ERROR_EMAIL_IN_USE, ERROR_OK} from "../../../../consts/error.const";

@Component({
  selector: 'app-user-settings-modal',
  templateUrl: './user-settings-modal.component.html',
  styleUrls: ['./user-settings-modal.component.scss']
})
export class UserSettingsModalComponent implements OnInit {
  public changeUsernameForm = this.fb.group({
    newUsername: ['', Validators.required]
  }, {
    updateOn: 'submit'
  });
  public changeUsernameFormSubmitted = false;

  public changeEmailForm = this.fb.group({
    newEmail: ['', [Validators.required, Validators.email]],
    newEmailConfirm: ['', Validators.required]
  }, {
    updateOn: 'submit'
  });
  public changeEmailFormSubmitted = false;
  public changeEmailFormSuccessed = false;
  public changeEmailFormEmailInUse = false;

  public changePasswordForm = this.fb.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', Validators.required],
    newPasswordConfirm: ['', Validators.required]
  }, {
    updateOn: 'submit'
  });
  public changePasswordFormSubmitted = false;

  constructor(private fb: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit(): void {
  }

  public changeEmail(): void {
    this.changeEmailFormSubmitted = true;
    this.changeEmailFormSuccessed = false;
    this.changeEmailFormEmailInUse = false;
    if (this.changeEmailForm.invalid) {
      return;
    }
    this.userService.editEmail(this.newEmail?.value).subscribe((response) => {
      if (response.error != ERROR_OK) {
        if (response.error == ERROR_EMAIL_IN_USE) {
          this.changeEmailFormEmailInUse = true;
        }
      } else {
        this.changeEmailFormSubmitted = false;
        this.changeEmailFormSuccessed = true;
      }
    }, () => {});
  }

  get newEmail(): AbstractControl | null {
    return this.changeEmailForm.get('newEmail');
  }

  get newEmailConfirm(): AbstractControl | null {
    return this.changeEmailForm.get('newEmailConfirm');
  }

}
