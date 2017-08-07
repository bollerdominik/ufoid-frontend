import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../shared/api.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Response} from "@angular/http";
import {VideoPost} from "../../video-list/video-post.model";

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.css']
})
export class EditViewComponent implements OnInit {
  private videoPost: VideoPost;

  constructor(private apiService: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>
      this.apiService.getVideoDetail(+params["id"]).subscribe(
        (response: Response) => {
          this.videoPost = this.apiService.getVideoPostModelFromJson(response.json());
        },
        (error) => console.error(error)
      ));
  }

}
