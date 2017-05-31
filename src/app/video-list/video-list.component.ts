import { Component, OnInit } from '@angular/core';
import {VideoPost} from './video-post.model';
import {VideoPostService} from "../VideoPostService";

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  videoPosts: VideoPost[] = [
    new VideoPost("A title for  video", "userABC", "London UK", 5),
    new VideoPost("Another  video", "userABC", "London UK", 10),
    new VideoPost("video 4", "userABC", "London UK", 10)
  ];

  constructor(private videoPostService: VideoPostService) { }

  ngOnInit() {
  }

  onClick(videopost: VideoPost) {
    this.videoPostService.videoPost = videopost;
  }

}
