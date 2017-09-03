import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/auth.service";
import {NgForm} from "@angular/forms";
import {Response} from "@angular/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private authError = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogIn(form: NgForm) {
    this.authError = false;
    const password = form.value.password;
    const username = form.value.username;
    this.authService.logInUser(username, password).subscribe(
      (response: Response) => {
        if (response.status === 200) {
          window.localStorage.token = response.headers.get('Authorization').slice(7);
          window.localStorage.userName = username;
          this.router.navigate(['ufo-videos']);
        }
      }, error => {
        if (error.status === 401) {
          this.authError = true;
        }
      }
    );
  }

  onResetButtonClicked() {
    this.router.navigate(['reset']);
  }
}
