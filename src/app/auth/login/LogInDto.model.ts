/**
 * Created by dubsta on 19.06.2017.
 */
export class LogInDto {
  private username: String;
  private password: String;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
