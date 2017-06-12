export class VideoPost {

  public id: number;
  public title: string;
  public user: string;
  public location: string;
  public numberOfComments: number;
  public link: string;
  public recordingDate: Date;

  constructor(id: number, title: string, user: string, location: string, numberOfComments: number, recordingDate: Date) {
    this.id = id;
    this.title = title;
    this.user = user;
    this.location = location;
    this.numberOfComments = numberOfComments;
    this.link = this.title.replace(new RegExp(' ', 'g'), '-');
    this.recordingDate = recordingDate;
  }

  getDateForVideoDetail() {
    return this.recordingDate.getFullYear() + "-" + (this.recordingDate.getMonth() + 1) + "-"
      + this.recordingDate.getDate()
      + "--" + this.recordingDate.getHours() + "-" + this.recordingDate.getMinutes() + "-" + this.recordingDate.getSeconds();
  }
}
