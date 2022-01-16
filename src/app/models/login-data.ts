export class LoginData {
  public userMail: string;
  public password: string;

  constructor(userMail: string, password: string) {
    this.userMail = userMail;
    this.password = password;
  }
}
