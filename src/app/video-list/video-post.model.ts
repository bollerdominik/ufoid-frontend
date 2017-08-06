export class VideoPost {

  public id: number;
  public title: string;
  public user: string;
  public location: string;
  public numberOfComments: number;
  public link: string;
  public recordingDate: Date;
  public uploadDate: Date
  public isPublished: boolean;
  public downloadCounter: number;

  constructor(id: number, title: string, user: string, location: string, numberOfComments: number, recordingDate: Date, uploadDate: Date,
              isPublished?: boolean, downloadCounter?: number) {
    this.id = id;
    this.title = title;
    this.user = user;
    this.location = location;
    this.numberOfComments = numberOfComments;
    this.link = this.title.replace(new RegExp(' ', 'g'), '-');
    this.recordingDate = recordingDate;
    this.uploadDate = uploadDate;
    this.isPublished = isPublished;
    this.downloadCounter = downloadCounter;
  }

  getVideoFileName(): string {
    return 'Capture--' + this.recordingDate.toISOString().slice(0, 10) + '--'
      + this.recordingDate.toTimeString().slice(0, 8).replace(new RegExp(':', 'g'), '-')
      + '.avi';
  }
}
