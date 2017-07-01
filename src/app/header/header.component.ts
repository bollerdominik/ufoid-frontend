import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private token: string;
  private userName: string;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.token = window.localStorage.token;
    this.userName = window.localStorage.userName;
    console.log(window.localStorage.token);

  }

}
