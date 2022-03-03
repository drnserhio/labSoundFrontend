import { Component, OnInit } from '@angular/core';
import {AlbumService} from "../service/album.service";
import {Album} from "../model/album";
import {HttpErrorResponse} from "@angular/common/http";
import {SelectAlbumHelper} from "../util/select-album-helper";
import {Router} from "@angular/router";

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit {
  albums?: Album[];

  constructor(private albumService: AlbumService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllAlbums();
  }


  getAllAlbums() {
    this.albumService.findAllAlbum().subscribe(
      (response: Album[]) => {
        this.albums = response;
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  onSelectAlbum(albumName: string) {
    SelectAlbumHelper.selectAlbumSaveToLocalStorage(albumName);
    this.router.navigateByUrl("/select_album");
  }
}
