import { Component, OnInit } from '@angular/core';
import {VideoPostService} from "../VideoPostService";

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {

  constructor(private videoPostService: VideoPostService) {
  }

  ngOnInit() {
    if (!this.videoPostService.videoPost) {
      console.log("is undefined");
      // Load data from api
    } else {
      console.log(this.videoPostService.videoPost);
    }
  }

}
