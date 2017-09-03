/**
 * Created by dubsta on 03.06.2017.
 */
import {Injectable} from "@angular/core";
import {Http, RequestOptionsArgs, Headers, Response} from "@angular/http";
import {VideoPost} from "../domain-model/video-post.model";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {API_URL, DataService, SIZE_PER_PAGE} from "./data.service";
import {Opinion} from "../domain-model/opinion.model";


@Injectable()
export  class ApiService {
  constructor(private http: Http, private authService: AuthService, private dataService: DataService) {}

  getVideoPosts(page: number) {
    return this.http.get(API_URL + 'videos?page=' + (page - 1) + '&size=' + SIZE_PER_PAGE);
  }
  getVideoDetail(id: number) {
    return this.http.get(API_URL + 'videos/' + id);
  }
  getVideoDownloadHash(id: number) {
    return this.http.get(API_URL + 'videos/' + id + '/download', this.getAuthHeader());
  }
  getUser(username: string) {
    return this.http.get(API_URL + 'users/' + username);
  }
  getAllVideosForAdmin(): Observable<VideoPost[]> {
    return this.http.get(API_URL + 'admin/videos', this.getAuthHeader()).map((response: Response) => {
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
    return this.http.post(API_URL + 'admin/video/' + id + '/' + isPublished, '', this.getAuthHeader());
  }
  editVideoPost(videoPost: VideoPost) {
    return this.http.post(API_URL + 'videos/' + videoPost.id + '/' + 'edit', videoPost, this.getAuthHeader());
  }
  getOpinionsForVideo(id: number): Observable<any> {
    return this.http.get(API_URL + 'videos/' + id + '/' + 'opinion').map((response: Response) => {
      const json = response.json();
      const data = json.opinionList;
      const opinions: Opinion[] = [];
      for (const post of data){
        opinions.push(this.dataService.getOpinionFromJson(post));
      }
      return {
        reputation: json.reputation,
        opinions: opinions
      };
    });
  }
  addOpinion(videopostId: number, opinion: Opinion) {
    return this.http.post(API_URL + 'videos/' + videopostId + '/' + 'opinion', opinion, this.getAuthHeader());
  }
  requestResetPasswordLink(email: string) {
    const body = new FormData();
    body.append('email', email);
    return this.http.post(API_URL + 'reset', body);
  }
  changePassword(token: string, pass: string) {
    const body = new FormData();
    body.append('token', token);
    body.append('p', pass);
    return this.http.post(API_URL + 'change', body);
  }
  getAuthHeader(): RequestOptionsArgs {
    const headers = new Headers();
    headers.append('Authorization', window.localStorage.token);
    const opts: RequestOptionsArgs = { headers: headers };
    return opts;
  }
}
