import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import {ApiService} from "../shared/api.service";
import {Response} from "@angular/http";

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
      this.apiService.getUser(params['username']).subscribe((response: Response) => {
          console.log(response.json());
          this.username = response.json().username;
          this.reputation = 13332;
        }, (error) => {
          if (error.status === 404) {
            // Todo: redirect to 404 page
          }
        }
      )
    ));
  }

}
