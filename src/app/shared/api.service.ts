/**
 * Created by dubsta on 03.06.2017.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {VideoPost} from "../video-list/video-post.model";
@Injectable()
export  class ApiService {
  constructor(private http: Http) {}

  getVideoPosts() {
    return this.http.get('http://localhost:8080/api/videos');
  }
  getVideoDetail(id: number) {
    return this.http.get('http://localhost:8080/api/videos/' + id);
  }
  getVideoPostModelFromJson(data): VideoPost {
    return new VideoPost(
      data.id, data.videoTitle, data.uploaderName, data.locationName, data.numberOfComments, new Date(data.recordingDate));
  }
}
