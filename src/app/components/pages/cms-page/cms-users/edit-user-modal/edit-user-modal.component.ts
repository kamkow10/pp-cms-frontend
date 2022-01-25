import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {ERROR_EMAIL_IN_USE, ERROR_NICKNAME_IN_USE, ERROR_OK} from "../../../../../consts/error.const";
import {UsersService} from "../../../../../services/users/users.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Role} from "../../../../../models/role";
import {UserService} from "../../../../../services/user/user.service";
import {PRIVILEGES} from "../../../../../consts/privilege.const";

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {
  public editingUserId: number;

  constructor(private fb: FormBuilder,
              private usersService: UsersService,
              private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: {editingUserId: number}) {
    this.editingUserId = this.data.editingUserId;
    this.hasAccessToEditRoles = this.userService.hasPrivilege(PRIVILEGES.EDIT_USER_ROLE);
  }

  ngOnInit(): void {
    this.usersService.getUserData(this.editingUserId).subscribe(userData => {
      this.role?.setValue(userData.roles[0].name);
    })
    this.usersService.getRoles().subscribe(roles => {
      this.roles = roles;
    })
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

  public changeRoleForm = this.fb.group({
    'role': ['']
  });
  public changeRoleFormSucceed = false;
  public changeRoleFormServerError = false;
  public roles: Role[];

  public hasAccessToEditRoles: boolean;

  public changeRole(): void {
    this.changeRoleFormSucceed = false;
    this.changeRoleFormServerError = false;
    this.usersService.editCmsUserRole(this.editingUserId, this.role?.value).subscribe((response) => {
      if (response.error != ERROR_OK) {
        this.changeRoleFormServerError = true;
      } else {
        this.changeRoleFormSucceed = true;
      }
    }, () => {
      this.changeRoleFormServerError = true;
    });
  }

  get role(): AbstractControl | null {
    return this.changeRoleForm.get('role');
  }

}
