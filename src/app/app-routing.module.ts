import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AlbumListComponent} from "./album-list/album-list.component";
import {SelectAlbumComponent} from "./select-album/select-album.component";

const routes: Routes = [

  {path: 'albums_list', component: AlbumListComponent},
  {path: '', redirectTo: '/albums_list', pathMatch: 'full'},
  {path: 'select_album', component: SelectAlbumComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
