import {Component, OnChanges, OnInit} from '@angular/core';
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }
  getToken() {
    return window.localStorage.token;
  }
  getUsername() {
    return window.localStorage.userName;
  }
}
