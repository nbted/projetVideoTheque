import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import {VideoUrlService} from './video-url.service'
import { AppComponent } from './app.component';
import { SafePipeComponent } from './safe-pipe/safe-pipe.component';


@NgModule({
  declarations: [
    AppComponent,
    SafePipeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [VideoUrlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
