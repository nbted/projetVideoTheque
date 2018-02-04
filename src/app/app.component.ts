import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { VideoUrlService } from './video-url.service';
import { DomSanitizer } from '@angular/platform-browser';


@Pipe({ name: 'safe' })
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, PipeTransform {

  videos: object[] = [];
  url1: object = {};
  video: any = {
    nomEtudiant: "",
    urlVideo: "",
    comments: ""
  }
  videoEdit: any = {
    nomEtudiant: "",
    comments: ""
  }
  msg: string = '';
  constructor(private videourlservice: VideoUrlService, private sanitizer: DomSanitizer) { }
  ngOnInit(): void {

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
  editVideo(video) {
    let position = this.videos.indexOf(video)
    let id = this.videos[position]["_id"]
    this.videourlservice.editVideoService(id, this.videoEdit).subscribe(response => this.msg = response.data)
    this.videos[position] = video;
  }


}

