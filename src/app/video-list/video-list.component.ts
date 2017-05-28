import { Component, OnInit } from '@angular/core';
import {VideoPost} from './video-post.model';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  videoPosts: VideoPost[] = [
    new VideoPost("A title for UFO video", "userABC", "London UK", 5),
    new VideoPost("Another UFO video", "userABC", "London UK", 10),
    new VideoPost("Another UFO video in the sky is flying oh so much text blabla", "userABC", "London UK", 10),
    new VideoPost("Another UFO video", "userABC", "London UK", 10),
    new VideoPost("Another UFO video", "userABC", "London UK", 10),
    new VideoPost("Another UFO video", "userABC", "London UK", 10)
  ];

  constructor() { }

  ngOnInit() {
  }

}
