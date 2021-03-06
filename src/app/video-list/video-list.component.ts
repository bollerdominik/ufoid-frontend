import {Component, Input, OnInit} from '@angular/core';
import {VideoPost} from '../domain-model/video-post.model';
import {ApiService} from "../shared/api.service";
import {Response} from "@angular/http";
import {DataService, SIZE_PER_PAGE} from "../shared/data.service";
import {ActivatedRoute} from "@angular/router";
import {isUndefined} from "util";
import {Title} from "@angular/platform-browser";
declare var ga: Function;

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent implements OnInit {
  public videoPosts: VideoPost[] = [];
  @Input() public userVideos: VideoPost[];
  @Input() public fromUser: boolean = false;
  public currentPage: number;
  public totalVideoPosts: number;

  constructor(private activeRoute: ActivatedRoute, private titleService: Title, private apiService: ApiService, private dataService: DataService) { }

  ngOnInit() {
    this.titleService.setTitle('UFOID | Videos - captured with the UFO Detector');
    this.activeRoute.queryParams.subscribe(data => {
      this.currentPage = isUndefined(data.page) ? 1 : data.page;
      if (!this.fromUser) {
        this.loadVideoList(this.currentPage);
      } else {

        let end = this.currentPage * SIZE_PER_PAGE;
        const start =  end - (SIZE_PER_PAGE - 1);
        end = end > this.userVideos.length ? this.userVideos.length : end;

        this.videoPosts = [];
        this.totalVideoPosts = this.userVideos.length;
        for (let pos = start; pos <= end; pos++) {
          this.videoPosts.push(this.userVideos[pos - 1]);
        }

      }
    });
    ga('set', 'page', '/ufo-videos');
    ga('send', 'pageview');
  }

  loadVideoList(page: number) {
    this.apiService.getVideoPosts(page).subscribe(
      (response: Response) => {
        this.videoPosts = [];
        const data = response.json();
        this.totalVideoPosts = data.total;
        for (const post of data.videoPostList){
          this.videoPosts.push(this.dataService.getVideoPostModelFromJson(post));
        }
      },
      (error) => console.error(error)
    );
  }


  convertToInt(val) {
    return parseInt(val);
  }
}
