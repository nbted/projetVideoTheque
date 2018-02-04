import { Component, OnInit } from '@angular/core';
import { VideoUrlService } from '../video-url.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from '../data.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  videoEdit:any;
  constructor(private videourlservice: VideoUrlService,private dataService:DataService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(response =>this.videoEdit = response);
    console.log(JSON.stringify(this.videoEdit))
  }

  editVideo() {
      let id =this.videoEdit._id
      console.log(JSON.stringify(this.videoEdit))
  
      this.videourlservice.editVideoService(id, this.videoEdit).subscribe(response =>console.log(response.data))
  }
}
