import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user/user.service";
import {MatDialog} from "@angular/material/dialog";
import {RegisterData} from "../../../../models/register-data";
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {confirmValidator} from "../../../../validators/custom-validatiors";
import {ERROR_EMAIL_IN_USE, ERROR_NICKNAME_IN_USE, ERROR_OK} from "../../../../consts/error.const";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {
  public registerForm = this.fb.group({
      nickname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      emailConfirm: ['', [Validators.required, confirmValidator('email')]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required, confirmValidator('password')]]
    },
    {
      updateOn: 'submit'
    }
  );

  public showMessageServerError = false;
  public showMessageNicknameInUse = false;
  public showMessageEmailInUse = false;
  public submitted = false;

  constructor(private userService: UserService,
              private matDialog: MatDialog,
              private fb: FormBuilder,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  public register(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.clearMessages();
    const registerData = this.getRegisterData();
    this.userService.register(registerData).subscribe(response => {
      if (response.error != ERROR_OK) {
        this.handleError(response.error);
      } else {
        this.finishRegistration()
      }
    }, (error) => {
      this.showMessageServerError = true;
      console.log(error);
    });
  }

  private getRegisterData(): RegisterData {
    return new RegisterData(this.email?.value, this.nickname?.value, this.password?.value);
  }

  private handleError(error: string): void {
    switch (error) {
      case ERROR_NICKNAME_IN_USE:
        this.showMessageNicknameInUse = true;
        break;
      case ERROR_EMAIL_IN_USE:
        this.showMessageEmailInUse = true;
        break;
    }
  }

  private clearMessages(): void {
    this.showMessageEmailInUse = false;
    this.showMessageNicknameInUse = false;
    this.showMessageServerError = false;
  }

  private finishRegistration(): void {
    this.matDialog.closeAll();
    this.snackBar.open('Udało się zarejestrować nowe konto', 'Zamknij');
  }

  get nickname(): AbstractControl | null {
    return this.registerForm.get('nickname');
  }

  get email(): AbstractControl | null {
    return this.registerForm.get('email');
  }

  get emailConfirm(): AbstractControl | null {
    return this.registerForm.get('emailConfirm');
  }

  get password(): AbstractControl | null {
    return this.registerForm.get('password');
  }

  get passwordConfirm(): AbstractControl | null {
    return this.registerForm.get('passwordConfirm');
  }
}
