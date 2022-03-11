import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from "@angular/router";
import {AlbumListComponent} from './album-list/album-list.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {SelectAlbumComponent} from './select-album/select-album.component';
import {ArtistListComponent} from './artist-list/artist-list.component';
import {CreateArtistComponent} from './create-artist/create-artist.component';
import {FormsModule} from "@angular/forms";
import {CreateAlbumComponent} from './create-album/create-album.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthService} from "./service/auth.service";
import {AuthGuard} from "./guard/auth-guard.guard";
import {AuthInterceptor} from "./interceptor/auth.interceptor";
import {ArtistService} from "./service/artist.service";
import {AlbumService} from "./service/album.service";
import {AudioService} from "./service/audio.service";
import {UserService} from "./service/user.service";

@NgModule({
  declarations: [
    AppComponent,
    AlbumListComponent,
    SelectAlbumComponent,
    ArtistListComponent,
    CreateArtistComponent,
    CreateAlbumComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        RouterModule,
        HttpClientModule,
        FormsModule,

    ],
  providers: [AuthService, AuthGuard, UserService, ArtistService, AlbumService, AudioService, {
    provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
