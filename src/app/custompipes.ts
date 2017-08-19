
import {Pipe, PipeTransform} from "@angular/core";
import {DataService, SIZE_PER_PAGE} from "./shared/data.service";

@Pipe({name: 'demoNumber'})
export class DemoNumber implements PipeTransform {

  constructor(public dataService: DataService) {

  }
  transform(value, args:string[]): any {
    let res = [];
    const count = this.dataService.getCountOfPages(value);
    for (let i = 1; i <= count; i++) {
      res.push(i);
    }
    return res;
  }
}
