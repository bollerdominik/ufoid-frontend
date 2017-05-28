export class VideoPost {
  public title: string;
  public user: string;
  public location: string;
  public numberOfComments: number;


  constructor(title: string, user: string, location: string, numberOfComments: number) {
    this.title = title;
    this.user = user;
    this.location = location;
    this.numberOfComments = numberOfComments;
  }
}
