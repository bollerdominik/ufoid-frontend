export const VIDEO_PREFIX = "Capture--";
export const VIDEO_EXTENSION = ".avi";

export class VideoPost {

  public id: number;
  public videoTitle: string;
  public user: string;
  public locationName: string;
  public link: string;
  public recordingDate: Date;
  public uploadDate: Date
  public isPublished: boolean;
  public downloadCounter: number;
  public description: string;
  public locationLatitudeLongitude: string;
  public numberOfOpinions: number;
  public yesOpinionPercentage: number;

  constructor(id: number, videoTitle: string, user: string, locationName: string, recordingDate: Date, uploadDate: Date,
              description: string, locationLatitudeLongitude: string, numberOfOpinions: number, yesOpinionPercentage: number,
              isPublished?: boolean, downloadCounter?: number) {
    this.id = id;
    this.videoTitle = videoTitle;
    this.user = user;
    this.locationName = locationName;
    this.link = this.videoTitle.replace(new RegExp(' ', 'g'), '-');
    this.recordingDate = recordingDate;
    this.uploadDate = uploadDate;
    this.description = description;
    this.locationLatitudeLongitude = locationLatitudeLongitude;
    this.numberOfOpinions = numberOfOpinions;
    this.yesOpinionPercentage = yesOpinionPercentage;
    this.isPublished = isPublished;
    this.downloadCounter = downloadCounter;
  }

  getVideoFileName(): string {
    return VIDEO_PREFIX + this.recordingDate.toISOString().slice(0, 10) + '--'
      + this.recordingDate.toISOString().slice(11, 19).replace(new RegExp(':', 'g'), '-')
      + VIDEO_EXTENSION;
  }
}
