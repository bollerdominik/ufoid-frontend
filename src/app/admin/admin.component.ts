import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth.service";
import {Response} from "@angular/http";
import {Router} from "@angular/router";
import 'rxjs/add/operator/catch';
import {VideoPost} from "../domain-model/video-post.model";
import {ApiService} from "../shared/api.service";
declare var ga: Function;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public videoPosts: VideoPost[] = [];
  constructor(public authService: AuthService, public apiService: ApiService, public router: Router) { }

  ngOnInit() {
    this.authService.checkAdmin().subscribe(
      (response: Response) => {
        if (response.status === 200) {
          this.apiService.getAllVideosForAdmin().subscribe(data => {
            this.videoPosts = data;
              ga('set', 'page', '/admin');
              ga('send', 'pageview');
          }
          );
        } else {
          console.log('not admin');
          this.router.navigate(['/']);
        }
      }, error => {
        console.log('error check admin');
        this.router.navigate(['/']);
      }
    );
  }

  onClickPublishButton(videopost: VideoPost) {
    this.apiService.setVideoPublished(videopost.id, !videopost.isPublished).subscribe(
      (response: Response) => {
        console.log('updated video published status to ' + !videopost.isPublished)
        videopost.isPublished = !videopost.isPublished;
      }
    );
  }

}
