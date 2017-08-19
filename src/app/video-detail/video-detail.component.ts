import {Component, OnChanges, OnInit} from '@angular/core';
import {VideoPostService} from "../shared/video-post.service";
import {VideoPost} from "../domain-model/video-post.model";
import {ApiService} from "../shared/api.service";
import {Response} from "@angular/http";
import {ActivatedRoute, Params} from "@angular/router";
import {AuthService} from "../shared/auth.service";
import {DataService} from "../shared/data.service";
import {Opinion, OpinionState} from "../domain-model/opinion.model";
import 'rxjs/add/operator/catch';
import {count} from "rxjs/operator/count";

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
  private newOpinionText: string;
  private isYesPressed: boolean = false;
  private isNoPressed: boolean = false;
  private successSavingOpinion: boolean = false;
  private errorSavingOpinion: boolean = false;
  private errorSavingOpinionText: string;
  private errorSavingOpinionNotLoggedIn: boolean = false;

  private progressBarWidth = {
    yes: 50,
    no: 50
  };

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
      this.apiService.getOpinionsForVideo(this.videoPost.id).subscribe((data => {
          this.opinions = data;
          if (this.opinions.length === 0) {
            this.progressBarWidth.yes = 50;
            this.progressBarWidth.no = 50;
          } else {
            this.calculateProgressBar();
          }
      }
      ));
    }
  }

  calculateProgressBar() {
    let countYes: number = 0;
    let countNo: number = 0;
    for (const opinion of this.opinions) {
      if (opinion.opinionState.toString() === OpinionState[OpinionState.YES]) {
        countYes++;
      } else if (opinion.opinionState.toString() === OpinionState[OpinionState.NO]) {
        countNo++;
      }
    }
    this.progressBarWidth.yes = (countYes / (countYes + countNo)) * 100;
    this.progressBarWidth.no = 100 - this.progressBarWidth.yes;
    console.log(this.progressBarWidth);


  }

  addOpinion() {
    this.errorSavingOpinion = false;
    this.errorSavingOpinionNotLoggedIn = false;
    this.successSavingOpinion = false;
    if (!this.isNoPressed && !this.isYesPressed) {
      this.errorSavingOpinion = true;
      this.errorSavingOpinionText = 'Please check one of the opinion options';
      return;
    }

    if (!this.newOpinionText || this.newOpinionText.length < 5) {
      this.errorSavingOpinion = true;
      this.errorSavingOpinionText = 'Please add a comment to your opinion';
      return;
    }

    if (!window.localStorage.token) {
      this.errorSavingOpinionNotLoggedIn = true;
      return;
    }

    const opinion: Opinion = new Opinion(0, this.newOpinionText, this.isYesPressed ? OpinionState.YES : OpinionState.NO, "", null);
    this.apiService.addOpinion(this.videoPost.id, opinion).subscribe((response: Response) => {
      if (response.status === 200) {
        this.errorSavingOpinion = false;
        this.successSavingOpinion = true;
        this.getOpinions();
      }
    },
      err => {
        this.errorSavingOpinion = true;
        this.errorSavingOpinionText = 'Error ' + err.status + ' saving the opinion. Please contact admin';
      });
  }

  onYesButtonClicked() {
    this.isYesPressed = true;
    this.isNoPressed = false;
  }

  onNoButtonClicked() {
    this.isYesPressed = false;
    this.isNoPressed = true;
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
    return [
      'just a',
      'moment'
    ];
  }

  timeSince(date: Date): string {
    var seconds = Math.floor((Number(new Date()) - Number(date)) / 1000);
    var duration = this.getDuration(seconds);
    var suffix = (duration[0] > 1 || duration[0] === 0) ? 's' : '';
    return duration[0] + ' ' + duration[1] + suffix;
  }

}
