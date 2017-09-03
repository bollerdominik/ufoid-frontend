import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ApiService} from "../../shared/api.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  private passwordIsChanged: boolean = false;
  private token: string;
  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.token = params['token']);
  }

  changePassword(form: NgForm) {
    this.apiService.changePassword(this.token, form.value.password).subscribe(data => {
      if (data.status === 200) {
        this.passwordIsChanged = true;
      }
    });
  }

}
