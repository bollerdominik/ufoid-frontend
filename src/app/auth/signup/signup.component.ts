import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../shared/auth.service";
import {Response, Headers} from "@angular/http";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signUpSuccess = false;
  public existingLoginError = false;
  public otherError = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    this.signUpSuccess = false;
    this.existingLoginError = false;
    this.otherError = false;
    const email = form.value.email;
    const password = form.value.password;
    const username = form.value.username;
    this.authService.createUser(username, email, password).subscribe(
      (response: Response) => {
        if (response.status === 200) {
          this.signUpSuccess = true;
        }
      }, error => {
        if (error.status === 400) {
          this.existingLoginError = true;
        } else if (error.status === 409) {
          this.otherError = true;
        }
      }
    );
  }

}
