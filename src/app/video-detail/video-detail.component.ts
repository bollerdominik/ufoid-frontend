import {Component, OnChanges, OnInit} from '@angular/core';
import {VideoPostService} from "../shared/video-post.service";
import {VideoPost} from "../domain-model/video-post.model";
import {ApiService} from "../shared/api.service";
import {Response} from "@angular/http";
import {ActivatedRoute, Params} from "@angular/router";
import {AuthService} from "../shared/auth.service";
import {DataService} from "../shared/data.service";
import {Opinion, OpinionState} from "../domain-model/opinion.model";

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  private videoPost: VideoPost;
  private authError = false;
  private opinions: Opinion[];
  public opinionState = OpinionState;

  private DURATION_IN_SECONDS = {
    epochs: ['year', 'month', 'day', 'hour', 'minute'],
    year: 31536000,
    month: 2592000,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  constructor(private videoPostService: VideoPostService, private apiService: ApiService, private authService: AuthService,
              private dataService: DataService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (!this.videoPostService.videoPost) {
      console.log("load data from api");
      this.route.params.subscribe((params: Params) =>
        this.apiService.getVideoDetail(+params["id"]).subscribe(
          (response: Response) => {
            this.videoPost = this.dataService.getVideoPostModelFromJson(response.json());
            this.getOpinions();
          },
          (error) => console.error(error)
        ));
    } else {
      this.videoPost = this.videoPostService.videoPost;
      this.getOpinions();
    }
  }

  getOpinions() {
    if (this.videoPost) {
      this.apiService.getOpinonsForVideo(this.videoPost.id).subscribe((data => {
          this.opinions = data;
      }
      ));
    }
  }

  onClickDownloadButton() {
    if (!window.localStorage.token) {
      this.authError = true;
      return;
    }

    let hash: string;
    this.apiService.getVideoDownloadHash(this.videoPost.id).subscribe((response: Response) => {
        hash = response.text();
        window.location.href = 'http://localhost:8080/api/files/' + this.videoPost.id + '/'
          + hash + '/' + this.videoPost.getVideoFileName();
      }, (error) => {
        if (error.status === 403) {
          this.authError = true;
        }
      }
    );
  }

  getDuration(seconds) {
    var epoch, interval;

    for (var i = 0; i < this.DURATION_IN_SECONDS.epochs.length; i++) {
      epoch = this.DURATION_IN_SECONDS.epochs[i];
      interval = Math.floor(seconds / this.DURATION_IN_SECONDS[epoch]);
      if (interval >= 1) {
        return [
          interval,
          epoch
        ];
      }
    }

  }

  timeSince(date: Date): string{
    var seconds = Math.floor((Number(new Date()) - Number(date)) / 1000);
    var duration = this.getDuration(seconds);
    var suffix = (duration[0] > 1 || duration[0] === 0) ? 's' : '';
    return duration[0] + ' ' + duration[1] + suffix;
  }

}
