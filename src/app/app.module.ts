import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { VideoListComponent } from './video-list/video-list.component';
import {RouterModule, Routes} from "@angular/router";
import { SoftwareComponent } from './software/software.component';
import { HomeComponent } from './home/home.component';
import {VideoPostService} from "./shared/video-post.service";
import {ApiService} from "./shared/api.service";
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import {AuthService} from "./shared/auth.service";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminComponent } from './admin/admin.component';
import { VideoCardComponent } from './video-list/video-card/video-card.component';
import { EditViewComponent } from './video-detail/edit-view/edit-view.component';
import {DataService} from "./shared/data.service";
import {DemoNumber} from "app/custompipes";
import { FooterComponent } from './footer/footer.component';
import { TitlebarComponent } from './header/titlebar/titlebar.component';
import { PasswordResetComponent } from './auth/password-reset/password-reset.component';
import { PasswordChangeComponent } from './auth/password-change/password-change.component';
import {TooltipModule} from "ngx-tooltip";

const appRoutes: Routes = [
  { path: 'software', component: SoftwareComponent },
  { path: 'ufo-videos', component: VideoListComponent},
  { path: 'ufo-videos/:id/edit', component: EditViewComponent},
  { path: 'ufo-videos/:id/:link', component: VideoDetailComponent},
  { path: 'ufo-videos/:id', component: VideoDetailComponent},
  { path: '', component: HomeComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'login', component: LoginComponent},
  { path: 'user/:username', component: UserProfileComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'reset', component: PasswordResetComponent},
  { path: 'change/:token', component: PasswordChangeComponent},
  { path: '**', redirectTo: 'ufo-videos', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    VideoDetailComponent,
    VideoListComponent,
    SoftwareComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    UserProfileComponent,
    AdminComponent,
    VideoCardComponent,
    EditViewComponent,
    DemoNumber,
    FooterComponent,
    TitlebarComponent,
    PasswordResetComponent,
    PasswordChangeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDEY3dR16Tijupr2gd0-UpUxOttLESkcFs',
      libraries: ['places']
    }),
    TooltipModule
  ],
  providers: [VideoPostService, ApiService, AuthService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
