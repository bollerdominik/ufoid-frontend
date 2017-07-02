import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import {ApiService} from "../shared/api.service";
import {Response} from "@angular/http";
import 'rxjs/Rx';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private username: string;
  private reputation: number;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => (
      this.apiService.getUser(params['username']).map(res => res.json()).subscribe(data => {
      this.username = data.username;
      this.reputation = 2222;
    })));
  }

}
