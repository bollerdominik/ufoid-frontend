import { Component, OnInit } from '@angular/core';
import {VideoPostService} from "../shared/video-post.service";
import {VideoPost} from "../video-list/video-post.model";
import {videoExtension, videoPreFix, videoStorageFolder} from "../shared/data.service";
import {ApiService} from "../shared/api.service";
import {Response} from "@angular/http";

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  private videoPost: VideoPost;

  constructor(private videoPostService: VideoPostService, private apiService: ApiService) {
  }

  ngOnInit() {
    if (!this.videoPostService.videoPost) {
      console.log("load data from api");
      this.apiService.getVideoDetail(1).subscribe(
        (response: Response) => {
          const post = response.json();
          console.log(post);
          this.videoPost = new VideoPost(
            post.id, post.videoTitle, post.uploaderName, post.locationName, post.numberOfComments, new Date(post.recordingDate * 1000));
        },
        (error) => console.error(error)
      );
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
