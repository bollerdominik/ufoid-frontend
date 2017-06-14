
import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs} from "@angular/http";
import {SignUpDto} from "../auth/signup/signupDto.model";
import {Response, Headers} from "@angular/http";

@Injectable()
export  class AuthService {
  constructor(private http: Http) {
  }

  createUser(username: String, email: String, password: String) {
    const dto: SignUpDto = new SignUpDto(username, email, password);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const opts: RequestOptionsArgs = { headers: headers };
    console.log(opts);
    this.http.post('http://localhost:8080/api/users/create', dto, opts)
      .subscribe(
        (response: Response) => {
          console.log(response);
          return response;
        }
      );
  }
}
