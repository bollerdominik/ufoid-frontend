import { Component, OnInit } from '@angular/core';
import {Params, ActivatedRoute} from "@angular/router";
import {ApiService} from "../shared/api.service";
import {VideoPost} from "../domain-model/video-post.model";
import {DataService} from "../shared/data.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  public username: string;
  public reputation: number;
  public uploadToken: string;
  public videoPosts: VideoPost[];

  constructor(private titleService: Title, private route: ActivatedRoute, private apiService: ApiService, private dataService: DataService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => (
      this.apiService.getUser(params['username']).map(res => res.json()).subscribe(data => {
        if (data) {
          this.username = data.username;
          this.titleService.setTitle('UFO ID | Profile - ' + this.username);
          this.reputation = data.reputation;
          this.uploadToken = data.uploadToken;
          this.videoPosts = [];
          for (const post of data.videoPosts){
            this.videoPosts.push(this.dataService.getVideoPostModelFromJson(post));
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
