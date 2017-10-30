/**
 * Created by dubsta on 06.06.2017.
 */
import {VideoPost} from "../domain-model/video-post.model";
import {Opinion} from "../domain-model/opinion.model";
import {Injectable} from "@angular/core";

export const videoStorageFolder = "storage";
export const VIDEO_PREFIX = "Capture--";
export const VIDEO_EXTENSION = ".avi";
export const WEB_VIDEO_NAME = "video.mp4";
export const SIZE_PER_PAGE = 6;
export const API_URL = 'https://api.ufoid.net/'

@Injectable()
export  class DataService {
  public pagesCount: number;

  getVideoPostModelFromJson(data): VideoPost {
    return new VideoPost(
      data.id, data.videoTitle, data.uploaderName, data.locationName, new Date(data.recordingDate), new Date(data.uploadDate), data.description,
      data.locationLatitudeLongitude, data.numberOfOpinions, data.yesOpinionPercentage);
  }

  getAdminVideoPostModelFromJson(data): VideoPost {
    return new VideoPost(
      data.id, data.videoTitle, data.uploaderName, data.locationName, new Date(data.recordingDate), new Date(data.uploadDate), data.description,
      data.locationLatitudeLongitude, data.numberOfOpinions, data.yesOpinionPercentage,
      data.isPublished, data.downloadCounter);
  }
  getOwnerVideoPostModelFromJson(data): VideoPost {
    return new VideoPost(
      data.id, data.videoTitle, data.uploaderName, data.locationName, new Date(data.recordingDate), new Date(data.uploadDate), data.description,
      data.locationLatitudeLongitude, data.numberOfOpinions, data.yesOpinionPercentage,
      data.published);
  }
  getOpinionFromJson(data): Opinion {
    return new Opinion(data.id, data.text, data.opinionState, data.username, data.date);
  }
  getCountOfPages(value: number): number {
    let countOfPages: number = value / SIZE_PER_PAGE;
    countOfPages = Math.floor(countOfPages);
    if (value % SIZE_PER_PAGE > 0) {
      countOfPages++;
    }
    this.pagesCount = countOfPages;
    return countOfPages;
  }

}
