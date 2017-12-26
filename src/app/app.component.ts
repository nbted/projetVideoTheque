import { Component, OnInit, Pipe,PipeTransform } from '@angular/core';
import {VideoUrlService} from './video-url.service';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({ name: 'safe' })
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit,PipeTransform{

  videos: object[]=[];
  url1 : object={};
  constructor(private videourlservice:VideoUrlService,private sanitizer: DomSanitizer){}
  ngOnInit(): void {
    //console.log("tedddddy"+ this.videourlservice.getVideos().pipe());
    this.videourlservice.getVideos().subscribe(response =>this.videos=response)
    
  }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
}

