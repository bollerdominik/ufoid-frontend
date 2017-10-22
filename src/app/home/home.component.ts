import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
declare var ga: Function;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('UFO Detector | UFO ID - Record & Analyze UFO Sightings');
    ga('set', 'page', '/');
    ga('send', 'pageview');
  }

}
