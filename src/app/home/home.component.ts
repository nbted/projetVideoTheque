import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { VideoUrlService } from '../video-url.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from '../data.service';

@Component({
  
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos: object[] = [];
  url1: object = {};
  video: any = {
    nomEtudiant: "",
    urlVideo: "",
    comments: ""
  }
  videoEdit: any ;
  msg: string = '';
   page=0;
   pagesize=6;
   pagesizemax;
   next:boolean=false;
   previous:boolean=true;
  @Output() videoEdited:EventEmitter<any>= new EventEmitter<any>();
  constructor(private videourlservice: VideoUrlService,private dataService:DataService,private sanitizer: DomSanitizer) { }
  ngOnInit(): void {
    this.videourlservice.getVideos(this.page).subscribe(response => {
      this.videos = response.data,
      this.pagesizemax=this.videos.length, 
      console.log("minnnenne"+  this.pagesizemax)
    })
    
  }
 
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  deleteVideo(video) {
    let position = this.videos.indexOf(video);
    let id = this.videos[position]["_id"]
    this.videourlservice.deleteVideoService(id).subscribe(response => this.msg = response.data)
    this.videos.splice(position, 1);
  }
  sendMessage(video) {
    this.dataService.changeMessage(video);
  }
  nextVideos(){
    
    this.page++;
    this.videourlservice.getVideos(this.page).subscribe(response => {
      this.videos = response.data,
      this.pagesizemax=this.videos.length,
      (this.pagesizemax<this.pagesize)?this.next=true : this.next=false;
    })
    this.previous=false
   
    
    console.log("max : "+ this.pagesizemax + "min" + this.pagesize)
    
    
    //if(page)
  }
  previousVideos(){
    this.page--;
    this.next=false;
    if(this.page ===0){
      //this.disabled=true
      this.previous=true
    }
    this.videourlservice.getVideos(this.page).subscribe(response => this.videos = response.data)
  }
}
