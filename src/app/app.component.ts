import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/auth.service";
import {Response} from "@angular/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    if (window.localStorage.token) {
      this.authService.checkToken().subscribe(
        (response: Response) => {
          if (response.status === 200) {
            console.log('ok token');
          }
        }, error => {
          console.log('expired token');
          window.localStorage.clear();
        }
      );
    }
  }


}


