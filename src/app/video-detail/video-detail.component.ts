import { Component, OnInit } from '@angular/core';
import {VideoPostService} from "../shared/video-post.service";
import {VideoPost} from "../video-list/video-post.model";
import {videoExtension, videoPreFix, videoStorageFolder} from "../shared/data.service";
import {ApiService} from "../shared/api.service";
import {Response} from "@angular/http";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  private videoPost: VideoPost;

  constructor(private videoPostService: VideoPostService, private apiService: ApiService, private route: ActivatedRoute) {
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
    window.location.href = "../" + videoStorageFolder + "/" +
      this.videoPost.id + "/" + "/" + videoPreFix + this.videoPost.getDateForVideoDetail() + videoExtension;
  }

}
