export class VideoPost {
  public title: string;
  public user: string;
  public location: string;
  public numberOfComments: number;
  public link: string;


  constructor(title: string, user: string, location: string, numberOfComments: number) {
    this.title = title;
    this.user = user;
    this.location = location;
    this.numberOfComments = numberOfComments;
    this.link = this.title.replace(new RegExp(' ', 'g'), '-');
  }


}
