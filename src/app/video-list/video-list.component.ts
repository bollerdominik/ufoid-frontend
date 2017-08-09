import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {VideoPost} from './video-post.model';
import {VideoPostService} from "../shared/video-post.service";
import {ApiService} from "../shared/api.service";
import {Response} from "@angular/http";
import {DataService} from "../shared/data.service";

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit, OnChanges {
  @Input() videoPosts: VideoPost[] = [
    // new VideoPost(1, "A title for  video", "userABC", "London UK", 5, new Date("2017-06-04T15:40:44.392+0000"), new Date(), ""),
    // new VideoPost(2, "Another  video", "userABC", "London UK", 10, new Date("2017-06-04T15:40:44.392+0000"),  new Date(), ""),
    // new VideoPost(3, "video 4", "userABC", "London UK", 10, new Date("2017-06-04T15:40:44.392+0000"), new Date(), "")
  ];
  @Input() private fromUser: boolean = false;

  constructor(private apiService: ApiService, private dataService: DataService) { }

  ngOnInit() {
    if (!this.fromUser) {
      this.apiService.getVideoPosts().subscribe(
        (response: Response) => {
          this.videoPosts = [];
          console.log('reading video list from api');
          const data = response.json();
          for (const post of data){
            this.videoPosts.push(this.dataService.getVideoPostModelFromJson(post));
          }
        },
        (error) => console.error(error)
      );
    }

  }

  ngOnChanges() {
    if (this.videoPosts && this.fromUser) {
      console.log(this.videoPosts);
    }
  }

}
