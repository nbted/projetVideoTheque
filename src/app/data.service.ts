import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject'

@Injectable()
export class DataService {

  public messageSource = new BehaviorSubject<any> ("");
  currentMessage = this.messageSource.asObservable();
  constructor() { }
  changeMessage(message:object){
    console.log("moiiiiiiiiiiiiiiiiiiiiii"+message)
    this.messageSource.next(message);
  }
}
