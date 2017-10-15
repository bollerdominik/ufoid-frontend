
import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs} from "@angular/http";
import {SignUpDto} from "../auth/signup/signupDto.model";
import {Headers} from "@angular/http";
import {LogInDto} from "../auth/login/LogInDto.model";
import {API_URL} from "./data.service";

@Injectable()
export  class AuthService {

  constructor(private http: Http) {
  }


  createUser(username: string, email: string, password: string) {
    const dto: SignUpDto = new SignUpDto(username, email, password);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const opts: RequestOptionsArgs = { headers: headers };
    return this.http.post(API_URL + 'users/create', dto, opts);
  }

  logInUser(username: string, password: string){
    const dto: LogInDto = new LogInDto(username, password);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const opts: RequestOptionsArgs = { headers: headers, withCredentials: true};
    return this.http.post(API_URL + 'login', dto, opts);
  }

  checkToken() {
    const headers = new Headers();
    headers.append('Authorization', window.localStorage.token);
    const opts: RequestOptionsArgs = { headers: headers };
    return this.http.get(API_URL + 'security/isUser', opts);
  }

  checkAdmin() {
    const headers = new Headers();
    headers.append('Authorization', window.localStorage.token);
    const opts: RequestOptionsArgs = { headers: headers };
    return this.http.get(API_URL + 'security/isAdmin', opts);
  }
}
