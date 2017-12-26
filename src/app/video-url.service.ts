import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class VideoUrlService {

  constructor(private http:Http) { }

  private url = "https://my-json-server.typicode.com/nbted/projetVideoTheque/posts"

  getVideos(){
    return this.http.get(this.url).map((response:Response)=>response.json());
  }
}
