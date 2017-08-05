/**
 * Created by dubsta on 03.06.2017.
 */
import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, Headers, Response} from "@angular/http";
import {VideoPost} from "../video-list/video-post.model";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';


@Injectable()
export  class ApiService {
  constructor(private http: Http, private authService: AuthService) {}

  getVideoPosts() {
    return this.http.get('http://localhost:8080/api/videos');
  }
  getVideoDetail(id: number) {
    return this.http.get('http://localhost:8080/api/videos/' + id);
  }
  getVideoDownloadHash(id: number) {
    const headers = new Headers();
    headers.append('Authorization', window.localStorage.token);
    const opts: RequestOptionsArgs = { headers: headers };
    return this.http.get('http://localhost:8080/api/videos/' + id + '/download', opts);
  }
  getVideoPostModelFromJson(data): VideoPost {
    return new VideoPost(
      data.id, data.videoTitle, data.uploaderName, data.locationName, data.numberOfComments, new Date(data.recordingDate));
  }
  getUser(username: string) {
    return this.http.get('http://localhost:8080/api/users/' + username);
  }
  getAllVideosForAdmin(): Observable<VideoPost[]> {
    return this.http.get('http://localhost:8080/api/videos').map((response: Response) => {
      const data = response.json();
      const videoPosts = [];
      for (const post of data){
        videoPosts.push(this.getVideoPostModelFromJson(post));
      }
      return videoPosts;
    })
      .catch(e => {
        if (e.status === 401) {
          return Observable.throw('Unauthorized');
        }
      });
  }
}
