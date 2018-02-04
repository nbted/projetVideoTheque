import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  videoPlay:any;
  constructor(private dataService:DataService, private sanitizer: DomSanitizer) { }


  ngOnInit() {
    this.dataService.currentMessage.subscribe(response =>this.videoPlay = response);
    console.log("tedddy" + JSON.stringify(this.videoPlay))
  }
  transform(url) {

    return this.sanitizer.bypassSecurityTrustResourceUrl(url+"?autoplay=1");
  }
}
