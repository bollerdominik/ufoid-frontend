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
import {VideoPostService} from "./shared/video-post.service";
import {ApiService} from "./shared/api.service";
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import {AuthService} from "./shared/auth.service";

const appRoutes: Routes = [
  { path: 'software', component: SoftwareComponent },
  { path: 'ufo-videos', component: VideoListComponent},
  { path: 'ufo-videos/:id/:link', component: VideoDetailComponent},
  { path: '', component: HomeComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VideoDetailComponent,
    VideoListComponent,
    VideoPostComponent,
    SoftwareComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [VideoPostService, ApiService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
