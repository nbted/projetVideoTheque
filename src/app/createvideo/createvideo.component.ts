import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { VideoUrlService } from '../video-url.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-createvideo',
  templateUrl: './createvideo.component.html',
  styleUrls: ['./createvideo.component.css']
})
export class CreatevideoComponent implements OnInit {
  //@Input()
  videos: object[] = [];
   video:any ={
    nomEtudiant:"",
     urlVideo:"",
     comments:"" 
    }
    page = 1;
  //@Output() videoCreated:EventEmitter<any>= new EventEmitter<any>();
  constructor(private videourlservice: VideoUrlService, private sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    this.videourlservice.getVideos(this.page).subscribe(response => this.videos = response.data)
  }
  addVideo(vid: any) {
    var i = 0;
    var cont = true;
    if (vid.nomEtudiant.trim() == "" || vid.urlVideo.trim() == "") {
      alert("il faut preciser le nom et l'url")
    }
    /*this.videourlservice.searchVideoService(vid.urlVideo).subscribe(response=>
      console.log(response))*/
    
   /* if(vid2 !== {}){
      alert("la video existe déjà!!!!");
      cont = false;
    }*/
    if (cont) {
      this.videourlservice.addVideos(vid).subscribe(response => console.log(response.data))
      this.videos.push(vid);
    }
    
  }
  /*
  onCreateVideo(){
    this.videoCreated.emit(this.video)
  }
  */
  

}
