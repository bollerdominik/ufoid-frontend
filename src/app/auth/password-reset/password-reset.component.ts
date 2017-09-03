import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../shared/api.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  private emailIsSent: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  sendEmail(form: NgForm) {
    this.apiService.requestResetPasswordLink(form.value.email).subscribe(data => {
      if (data.ok) {
        this.emailIsSent = true;
      }
    });
  }

}
