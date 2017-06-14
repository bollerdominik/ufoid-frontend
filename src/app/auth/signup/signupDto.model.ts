/**
 * Created by dubsta on 14.06.2017.
 */
export class SignUpDto {
  private username: String;
  private email: String;
  private password: String;

  constructor(username: String, email: String, password: String) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
