import { Component, OnInit } from '@angular/core';
import {VideoPostService} from "../shared/video-post.service";
import {VideoPost} from "../video-list/video-post.model";
import {videoExtension, videoPreFix, videoStorageFolder} from "../shared/data.service";

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  private videoPost: VideoPost;

  constructor(private videoPostService: VideoPostService) {
  }

  ngOnInit() {
    if (!this.videoPostService.videoPost) {
      console.log("load data from api");
      this.videoPost = new VideoPost(1, "Another  video", "userABC", "London UK", 10, new Date("2017-06-04T15:40:44"));
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
