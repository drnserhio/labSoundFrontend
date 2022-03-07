import {NgModule} from '@angular/core';
import {BrowserModule, DomSanitizer} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from "@angular/router";
import { AlbumListComponent } from './album-list/album-list.component';
import {HttpClientModule} from "@angular/common/http";
import { SelectAlbumComponent } from './select-album/select-album.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { ArtistListComponent } from './artist-list/artist-list.component';
import { CreateArtistComponent } from './create-artist/create-artist.component';
import {FormsModule} from "@angular/forms";
import { CreateAlbumComponent } from './create-album/create-album.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumListComponent,
    SelectAlbumComponent,
    ArtistListComponent,
    CreateArtistComponent,
    CreateAlbumComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatSliderModule,
        FormsModule,

    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
