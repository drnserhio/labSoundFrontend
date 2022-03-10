import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AlbumListComponent} from "./album-list/album-list.component";
import {SelectAlbumComponent} from "./select-album/select-album.component";
import {ArtistListComponent} from "./artist-list/artist-list.component";
import {CreateArtistComponent} from "./create-artist/create-artist.component";
import {CreateAlbumComponent} from "./create-album/create-album.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'albums_list', component: AlbumListComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'select_album', component: SelectAlbumComponent},
  {path: 'artist_list', component: ArtistListComponent},
  {path: 'create_atrist', component: CreateArtistComponent},
  {path: "create_album", component: CreateAlbumComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
