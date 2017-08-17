export enum OpinionState {YES = 0, NO = 1}

export class Opinion {
  public id: number;
  public text: string;
  public opinionState: OpinionState;
  public username: string;
  public date: Date;


  constructor(id: number, text: string, opinionState: OpinionState, username: string, date: Date) {
    this.id = id;
    this.text = text;
    this.opinionState = opinionState;
    this.username = username;
    this.date = date;
  }
}
