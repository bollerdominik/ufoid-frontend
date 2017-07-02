import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import {ApiService} from "../shared/api.service";
import 'rxjs/Rx';
import {VideoPost} from "../video-list/video-post.model";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  private username: string;
  private reputation: number;
  private videoPosts: VideoPost[] = [];

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => (
      this.apiService.getUser(params['username']).map(res => res.json()).subscribe(data => {
        if (data) {
          this.username = data.username;
          this.reputation = 1222;
          for (const post of data.videoPosts){
            this.videoPosts.push(this.apiService.getVideoPostModelFromJson(post));
          }
        }
    },
      error => {
        if (error.status === 404) {
          // Todo: redirect to 404 page
          console.log('no user found');
        }
      })));
  }

}
