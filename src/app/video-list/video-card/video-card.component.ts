import {Component, Input, OnInit} from '@angular/core';
import {VideoPost} from "../../domain-model/video-post.model";
import {VideoPostService} from "../../shared/video-post.service";
import {API_URL} from "../../shared/data.service";

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent implements OnInit {

  @Input() public videoPost: VideoPost;
  public displayEditIcon: boolean = false;
  public API_URL = API_URL;

  constructor(private videoPostService: VideoPostService) {
  }

  ngOnInit() {
    if (window.localStorage.userName === this.videoPost.user) {
      this.displayEditIcon = true;
    }
  }

  onClick(videoPost: VideoPost) {
    this.videoPostService.videoPost = videoPost;
  }

}
