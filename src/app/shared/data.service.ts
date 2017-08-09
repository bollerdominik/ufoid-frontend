/**
 * Created by dubsta on 06.06.2017.
 */
import {VideoPost} from "../video-list/video-post.model";

export const videoStorageFolder = "storage";
export const videoPreFix = "Capture--";
export const videoExtension = ".avi";
export const webVideoName = "video.mp4";

export  class DataService {

  getVideoPostModelFromJson(data): VideoPost {
    return new VideoPost(
      data.id, data.videoTitle, data.uploaderName, data.locationName, data.numberOfComments, new Date(data.recordingDate), new Date(data.uploadDate), data.description,
      data.locationLatitudeLongitude);
  }

  getAdminVideoPostModelFromJson(data): VideoPost {
    return new VideoPost(
      data.id, data.videoTitle, data.uploaderName, data.locationName, data.numberOfComments, new Date(data.recordingDate), new Date(data.uploadDate), data.description,
      data.locationLatitudeLongitude,
      data.isPublished, data.downloadCounter);
  }

}
