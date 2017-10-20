import {Component, OnChanges, OnInit} from '@angular/core';
import {VideoPostService} from "../shared/video-post.service";
import {VideoPost} from "../domain-model/video-post.model";
import {ApiService} from "../shared/api.service";
import {Response} from "@angular/http";
import {ActivatedRoute, Params} from "@angular/router";
import {AuthService} from "../shared/auth.service";
import {API_URL, DataService} from "../shared/data.service";
import {Opinion, OpinionState} from "../domain-model/opinion.model";
import 'rxjs/add/operator/catch';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  public videoPost: VideoPost;
  public authError = false;
  public opinions: Opinion[];
  public opinionState = OpinionState;
  public newOpinionText: string;
  public isYesPressed: boolean = false;
  public isNoPressed: boolean = false;
  public successSavingOpinion: boolean = false;
  public errorSavingOpinion: boolean = false;
  public errorSavingOpinionText: string;
  public errorSavingOpinionNotLoggedIn: boolean = false;
  public reputation: number;
  public API = API_URL;

  public progressBarWidth = {
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

  constructor(private titleService: Title, private videoPostService: VideoPostService, private apiService: ApiService, private authService: AuthService,
              private dataService: DataService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (!this.videoPostService.videoPost) {
      console.log("load data from api");
      this.route.params.subscribe((params: Params) =>
        this.apiService.getVideoDetail(+params["id"]).subscribe(
          (response: Response) => {
            this.videoPost = this.dataService.getVideoPostModelFromJson(response.json());
            this.titleService.setTitle('UFO Detector | Video - ' + this.videoPost.videoTitle);
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
          this.reputation = data.reputation;
          this.opinions = data.opinions;
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
  }

  addOpinion() {
    this.errorSavingOpinion = false;
    this.errorSavingOpinionNotLoggedIn = false;
    this.successSavingOpinion = false;
    if (!this.isNoPressed && !this.isYesPressed) {
      this.errorSavingOpinion = true;
      this.errorSavingOpinionText = 'Please check one YES / NO option ';
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
        window.location.href = API_URL + 'files/' + this.videoPost.id + '/'
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
