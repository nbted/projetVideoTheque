import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class VideoUrlService {

  constructor(private http:Http) { }

  //private url = "https://my-json-server.typicode.com/nbted/projetVideoTheque/posts"
  
  private url ="http://localhost:8080/api/videos"

  getVideos(page:number){
    if(page===0)
    return this.http.get(this.url).map((response:Response)=>response.json());
    else
    return this.http.get(this.url+"?page="+page).map((response:Response)=>response.json());
  }
  addVideos(model:any){
    //console.log("2222"+model.urlVideo)
    return this.http.post(this.url,model).map((response:Response)=>response.json());
    
  }
  deleteVideoService(id){
    
    return this.http.delete(this.url+"/"+id).map((response:Response)=>response.json());
  }
  editVideoService(id,videoEdit:any){
    return this.http.put(this.url+"/"+id,videoEdit).map((response:Response)=>response.json());
  }
}
