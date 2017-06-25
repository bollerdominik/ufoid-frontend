
import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs} from "@angular/http";
import {SignUpDto} from "../auth/signup/signupDto.model";
import {Response, Headers} from "@angular/http";
import {LogInDto} from "../auth/login/LogInDto.model";

@Injectable()
export  class AuthService {
  public token: string;

  constructor(private http: Http) {
  }


  createUser(username: string, email: string, password: string) {
    const dto: SignUpDto = new SignUpDto(username, email, password);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const opts: RequestOptionsArgs = { headers: headers };
    return this.http.post('http://localhost:8080/api/users/create', dto, opts);
  }

  logInUser(username: string, password: string){
    const dto: LogInDto = new LogInDto(username, password);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const opts: RequestOptionsArgs = { headers: headers };
    return this.http.post('http://localhost:8080/api/login', dto, opts);
  }
}
