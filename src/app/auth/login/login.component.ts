import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../shared/auth.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onLogIn(form: NgForm) {
    const password = form.value.password;
    const username = form.value.username;
    this.authService.logInUser(username, password);
  }
}
