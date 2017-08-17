/**
 * Created by dubsta on 03.06.2017.
 */
import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, Headers, Response} from "@angular/http";
import {VideoPost} from "../domain-model/video-post.model";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {DataService} from "./data.service";
import {Opinion} from "../domain-model/opinion.model";


@Injectable()
export  class ApiService {
  constructor(private http: Http, private authService: AuthService, private dataService: DataService) {}

  getVideoPosts() {
    return this.http.get('http://localhost:8080/api/videos');
  }
  getVideoDetail(id: number) {
    return this.http.get('http://localhost:8080/api/videos/' + id);
  }
  getVideoDownloadHash(id: number) {
    return this.http.get('http://localhost:8080/api/videos/' + id + '/download', this.getAuthHeader());
  }
  getUser(username: string) {
    return this.http.get('http://localhost:8080/api/users/' + username);
  }
  getAllVideosForAdmin(): Observable<VideoPost[]> {
    return this.http.get('http://localhost:8080/api/admin/videos', this.getAuthHeader()).map((response: Response) => {
      const data = response.json();
      const videoPosts = [];
      for (const post of data){
        videoPosts.push(this.dataService.getAdminVideoPostModelFromJson(post));
      }
      return videoPosts;
    })
      .catch(e => {
        if (e.status === 401) {
          return Observable.throw('Unauthorized');
        }
      });
  }
  setVideoPublished(id: number, isPublished: boolean) {
    return this.http.post('http://localhost:8080/api/admin/video/' + id + '/' + isPublished, '', this.getAuthHeader());
  }
  editVideoPost(videoPost: VideoPost) {
    return this.http.post('http://localhost:8080/api/videos/' + videoPost.id + '/' + 'edit', videoPost, this.getAuthHeader());
  }
  getOpinonsForVideo(id: number): Observable<Opinion[]> {
    return this.http.get('http://localhost:8080/api/videos/' + id + '/' + 'opinion').map((response: Response) => {
      const data = response.json();
      const opinions: Opinion[] = [];
      for (const post of data){
        opinions.push(this.dataService.getOpinionFromJson(post));
      }
      return opinions;
    });
  }
  getAuthHeader(): RequestOptionsArgs {
    const headers = new Headers();
    headers.append('Authorization', window.localStorage.token);
    const opts: RequestOptionsArgs = { headers: headers };
    return opts;
  }
}
