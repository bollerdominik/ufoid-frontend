import { Component, OnInit } from '@angular/core';
import {VideoPostService} from "../shared/video-post.service";
import {VideoPost} from "../video-list/video-post.model";
import {videoExtension, videoPreFix, videoStorageFolder} from "../shared/data.service";
import {ApiService} from "../shared/api.service";
import {Response} from "@angular/http";
import {ActivatedRoute, Params} from "@angular/router";
import {AuthService} from "../shared/auth.service";

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  private videoPost: VideoPost;
  private authError = false;

  constructor(private videoPostService: VideoPostService, private apiService: ApiService, private authService: AuthService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (!this.videoPostService.videoPost) {
      console.log("load data from api");
      this.route.params.subscribe((params: Params) =>
        this.apiService.getVideoDetail(+params["id"]).subscribe(
          (response: Response) => {
            this.videoPost = this.apiService.getVideoPostModelFromJson(response.json());
          },
          (error) => console.error(error)
        ));
    } else {
      console.log(this.videoPostService.videoPost);
      this.videoPost = this.videoPostService.videoPost;
    }
  }

  onClickDownloadButton() {
    if (!this.authService.token) {
      this.authError = true;
      return;
    }
    let hash: string;
    this.apiService.getVideoDownloadHash(this.videoPost.id).subscribe((response: Response) => {
        hash = response.text();
        console.log(hash);
        window.location.href = "../" + videoStorageFolder + "/" +
          this.videoPost.id + "/" + hash + "/" + videoPreFix + this.videoPost.getDateForVideoDetail() + videoExtension;
      }, (error) => {
        if (error.status === 403) {
          this.authError = true;
        }
      }
    );
  }

}
