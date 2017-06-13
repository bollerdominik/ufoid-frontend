/**
 * Created by dubsta on 03.06.2017.
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
@Injectable()
export  class ApiService {
  constructor(private http: Http) {}

  getVideoPosts() {
    return this.http.get('http://localhost:8080/api/videos');
  }
  getVideoDetail(id: number) {
    return this.http.get('http://localhost:8080/api/videos/' + id);
  }
}
