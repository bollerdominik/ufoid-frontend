export class VideoPost {

  public id: number;
  public videoTitle: string;
  public user: string;
  public locationName: string;
  public numberOfComments: number;
  public link: string;
  public recordingDate: Date;
  public uploadDate: Date
  public isPublished: boolean;
  public downloadCounter: number;
  public description: string;
  public locationLatitudeLongitude: string;

  constructor(id: number, videoTitle: string, user: string, locationName: string, numberOfComments: number, recordingDate: Date, uploadDate: Date, description: string,
              isPublished?: boolean, downloadCounter?: number) {
    this.id = id;
    this.videoTitle = videoTitle;
    this.user = user;
    this.locationName = locationName;
    this.numberOfComments = numberOfComments;
    this.link = this.videoTitle.replace(new RegExp(' ', 'g'), '-');
    this.recordingDate = recordingDate;
    this.uploadDate = uploadDate;
    this.description = description;
    this.isPublished = isPublished;
    this.downloadCounter = downloadCounter;
  }

  getVideoFileName(): string {
    return 'Capture--' + this.recordingDate.toISOString().slice(0, 10) + '--'
      + this.recordingDate.toTimeString().slice(0, 8).replace(new RegExp(':', 'g'), '-')
      + '.avi';
  }
}
