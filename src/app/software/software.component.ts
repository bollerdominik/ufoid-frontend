import { Component, OnInit } from '@angular/core';
declare var ga: Function;
@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    ga('set', 'page', '/software');
    ga('send', 'pageview');
  }

}
