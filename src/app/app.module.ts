import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import {VideoUrlService} from './video-url.service'
import { AppComponent } from './app.component';
import { SafePipeComponent } from './safe-pipe/safe-pipe.component';
import { StarRatingModule } from 'angular-star-rating';
import { CreatevideoComponent } from './createvideo/createvideo.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';
import { DataService } from './data.service';
import { PlayComponent } from './play/play.component';

const appRoutes: Routes = [
  {path:'',component:HomeComponent},
  { path: 'createvideo', component: CreatevideoComponent },
  { path: 'editvideo', component: EditComponent },
  { path: 'playvideo', component: PlayComponent }
  
]
@NgModule({
  declarations: [
    AppComponent,
    SafePipeComponent,
    CreatevideoComponent,
    HomeComponent,
    EditComponent,
    PlayComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    StarRatingModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [VideoUrlService,DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
