import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
declare var ga: Function;
@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('UFOID | UFO Detector');
    ga('set', 'page', '/software');
    ga('send', 'pageview');
  }

}
