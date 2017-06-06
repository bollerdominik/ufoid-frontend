import { Component, OnInit } from '@angular/core';
import {VideoPost} from './video-post.model';
import {VideoPostService} from "../video-post.service";
import {ApiService} from "../api.service";
import {Response} from "@angular/http";

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  videoPosts: VideoPost[] = [
    new VideoPost(1, "A title for  video", "userABC", "London UK", 5, new Date("2017-06-04T15:40:44.392+0000")),
    new VideoPost(2, "Another  video", "userABC", "London UK", 10, new Date("2017-06-04T15:40:44.392+0000")),
    new VideoPost(3, "video 4", "userABC", "London UK", 10, new Date("2017-06-04T15:40:44.392+0000"))
  ];

  constructor(private videoPostService: VideoPostService, private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getVideoPosts().subscribe(
      (response: Response) => {
        this.videoPosts = [];
        const data = response.json();
        console.log(data);
        for (const post of data._embedded.videoPosts){
          this.videoPosts.push(new VideoPost(
            post.id, post.videoTitle, post.uploaderName, post.locationName, post.numberOfComments, post.recordingDate));
        }
      },
      (error) => console.error(error)
    );
  }

  onClick(videopost: VideoPost) {
    this.videoPostService.videoPost = videopost;
  }



}
