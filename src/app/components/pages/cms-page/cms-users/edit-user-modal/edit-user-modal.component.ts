import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {ERROR_EMAIL_IN_USE, ERROR_NICKNAME_IN_USE, ERROR_OK} from "../../../../../consts/error.const";
import {UsersService} from "../../../../../services/users/users.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {
  public editingUserId: number;

  constructor(private fb: FormBuilder,
              private usersService: UsersService,
              @Inject(MAT_DIALOG_DATA) public data: {editingUserId: number}) {
    this.editingUserId = this.data.editingUserId;
  }

  ngOnInit(): void {
  }

  // Email form -----------------------------------------------------

  public changeEmailForm = this.fb.group({
    newEmail: ['', [Validators.required, Validators.email]]
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
    this.usersService.editCmsUserMail(this.editingUserId, this.newEmail?.value).subscribe((response) => {
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
    this.usersService.editCmsUserUsername(this.editingUserId, this.newUsername?.value).subscribe((response) => {
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

  // Role form -----------------------------------------------------

  public changeEmailForm = this.fb.group({
    newEmail: ['', [Validators.required, Validators.email]]
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
    this.usersService.editCmsUserMail(this.editingUserId, this.newEmail?.value).subscribe((response) => {
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

}
