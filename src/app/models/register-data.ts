export class RegisterData {
  public userMail: string;
  public userName: string;
  public userPassword: string;

  constructor(userMail: string, userName: string, userPassword: string) {
    this.userMail = userMail;
    this.userName = userName;
    this.userPassword = userPassword;
  }
}
