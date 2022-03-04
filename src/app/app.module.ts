import {NgModule} from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from "@angular/router";
import { AlbumListComponent } from './album-list/album-list.component';
import {HttpClientModule} from "@angular/common/http";
import { SelectAlbumComponent } from './select-album/select-album.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumListComponent,
    SelectAlbumComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        HttpClientModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
