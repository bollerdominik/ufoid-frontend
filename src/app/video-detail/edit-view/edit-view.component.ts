import {Component, NgZone, OnInit} from '@angular/core';
import {ApiService} from "../../shared/api.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Response} from "@angular/http";
import {VideoPost} from "../../video-list/video-post.model";
import {MapsAPILoader} from "@agm/core";
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

  constructor(private apiService: ApiService, private route: ActivatedRoute, private loader: MapsAPILoader,
              private zone: NgZone) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>
      this.apiService.getVideoDetail(+params["id"]).subscribe(
        (response: Response) => {
          this.videoPost = this.apiService.getVideoPostModelFromJson(response.json());
        },
        (error) => console.error(error)
      ));
    this.autocomplete();
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
        }
      },
      (error) => console.error(error)
    );
  }

}
