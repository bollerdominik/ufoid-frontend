import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../shared/api.service";
import {NgForm} from "@angular/forms";
declare var ga: Function;

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  public emailIsSent: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    ga('set', 'page', '/reset');
    ga('send', 'pageview');
  }

  sendEmail(form: NgForm) {
    this.apiService.requestResetPasswordLink(form.value.email).subscribe(data => {
      if (data.ok) {
        this.emailIsSent = true;
      }
    });
  }

}
