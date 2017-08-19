import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {VideoPost} from '../domain-model/video-post.model';
import {ApiService} from "../shared/api.service";
import {Response} from "@angular/http";
import {DataService} from "../shared/data.service";
import {ActivatedRoute} from "@angular/router";
import {isUndefined} from "util";

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
  private currentPage: number;
  private totalVideoPosts: number = 0;

  constructor(private activeRoute: ActivatedRoute, private apiService: ApiService, private dataService: DataService) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(data => {
      this.currentPage = isUndefined(data.page) ? 1 : data.page;
      this.loadVideoList(this.currentPage);
    });

    // if (!this.fromUser) {
    //   const page = this.activeRoute.snapshot.queryParams.page > 1 ? this.activeRoute.snapshot.queryParams.page : 1;
    //   this.loadVideoList(page);
    // }
  }

  loadVideoList(page: number) {
    this.apiService.getVideoPosts(page).subscribe(
      (response: Response) => {
        this.videoPosts = [];
        console.log('reading video list from api');
        const data = response.json();
        this.totalVideoPosts = data.total;
        for (const post of data.videoPostList){
          this.videoPosts.push(this.dataService.getVideoPostModelFromJson(post));
        }
      },
      (error) => console.error(error)
    );
  }

  ngOnChanges() {
    if (this.videoPosts && this.fromUser) {
      console.log(this.videoPosts);
    }
  }

  convertToInt(val) {
    return parseInt(val);
  }
}
