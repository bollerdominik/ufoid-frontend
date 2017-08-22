import {Component, NgZone, OnInit} from '@angular/core';
import {ApiService} from "../../shared/api.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Response} from "@angular/http";
import {VideoPost} from "../../domain-model/video-post.model";
import {MapsAPILoader} from "@agm/core";
import {API_URL, DataService} from "../../shared/data.service";
import {Location} from '@angular/common';

declare var google: any;

@Component({
  selector: 'app-edit-view',
  templateUrl: './edit-view.component.html',
  styleUrls: ['./edit-view.component.css']
})
export class EditViewComponent implements OnInit {
  private videoPost: VideoPost;
  private lat: number;
  private lng: number;
  private zoom: number = 2;
  private videoWasSaved: boolean = false;
  private videoErrorSaving: boolean = false;
  private API_URL = API_URL;

  constructor(private apiService: ApiService, private dataService: DataService, private route: ActivatedRoute, private loader: MapsAPILoader,
              private zone: NgZone, private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>
      this.apiService.getVideoDetail(+params["id"]).subscribe(
        (response: Response) => {
          this.videoPost = this.dataService.getVideoPostModelFromJson(response.json());
          if (!this.isUserLoggedIn()) {
            this.cancel();
          }
          if (this.videoPost.locationLatitudeLongitude) {
            const location = this.videoPost.locationLatitudeLongitude.split(',');
            this.lat = Number(location[0]);
            this.lng = Number(location[1]);
            this.zoom = 13;
          }
        },
        (error) => console.error(error)
      ));
    this.autocomplete();
  }

  isUserLoggedIn(): boolean {
    return this.videoPost.user === window.localStorage.userName;
  }

  autocomplete() {
    this.loader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocompleteInput"), {});
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        this.zone.run(() => {
          const place = autocomplete.getPlace();
          if (place.geometry) {
            this.lat = place.geometry.location.lat();
            this.lng = place.geometry.location.lng();
            this.zoom = 13;
            this.videoPost.locationName = place.formatted_address;
            this.videoPost.locationLatitudeLongitude = this.lat + ',' + this.lng;
          }
        });
      });
    });
  }

  saveVideoPost() {
    this.apiService.editVideoPost(this.videoPost).subscribe(
      (response: Response) => {
        if (response.status === 200) {
          this.videoWasSaved = true;
        }
      },
      (error) => this.videoErrorSaving = true
    );
  }

  cancel() {
    this.location.back();
  }

}
