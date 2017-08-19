/**
 * Created by dubsta on 06.06.2017.
 */
import {VideoPost} from "../domain-model/video-post.model";
import {Opinion} from "../domain-model/opinion.model";

export const videoStorageFolder = "storage";
export const videoPreFix = "Capture--";
export const videoExtension = ".avi";
export const webVideoName = "video.mp4";
export const SIZE_PER_PAGE = 2;

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
  getOpinionFromJson(data): Opinion {
    return new Opinion(data.id, data.text, data.opinionState, data.username, data.date);
  }
  getCountOfPages(value: number): number {
    let countOfPages: number = value / SIZE_PER_PAGE;
    if (value % SIZE_PER_PAGE > 0) {
      countOfPages++;
    }
    this.pagesCount = countOfPages;
    return countOfPages;
  }

}
