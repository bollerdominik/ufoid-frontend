import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoPostComponent } from './video-list/video-post/video-post.component';
import {RouterModule, Routes} from "@angular/router";
import { SoftwareComponent } from './software/software.component';
import { HomeComponent } from './home/home.component';
import {VideoPostService} from "./video-post.service";

const appRoutes: Routes = [
  { path: 'software', component: SoftwareComponent },
  { path: 'ufo-videos', component: VideoListComponent},
  { path: 'ufo-videos/:id/:link', component: VideoDetailComponent},
  { path: '', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VideoDetailComponent,
    VideoListComponent,
    VideoPostComponent,
    SoftwareComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [VideoPostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
