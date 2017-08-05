import {Component, Input, OnInit} from '@angular/core';
import {VideoPost} from "../video-post.model";
import {VideoPostService} from "../../shared/video-post.service";

@Component({
  selector: 'app-video-card',
  templateUrl: './video-card.component.html',
  styleUrls: ['./video-card.component.css']
})
export class VideoCardComponent implements OnInit {

  @Input() videoPost: VideoPost;

  constructor(private videoPostService: VideoPostService) {
  }

  ngOnInit() {
  }

  onClick(videoPost: VideoPost) {
    this.videoPostService.videoPost = videoPost;
  }

}
