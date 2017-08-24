import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css']
})
export class TitlebarComponent implements OnInit {

  @Input() private title: string;

  constructor() { }

  ngOnInit() {
  }

}
