import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ApiService} from "../../shared/api.service";
import {NgForm} from "@angular/forms";
declare var ga: Function;

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  public passwordIsChanged: boolean = false;
  public token: string;
  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => this.token = params['token']);
    ga('set', 'page', '/change');
    ga('send', 'pageview');
  }

  changePassword(form: NgForm) {
    this.apiService.changePassword(this.token, form.value.password).subscribe(data => {
      if (data.status === 200) {
        this.passwordIsChanged = true;
      }
    });
  }

}
