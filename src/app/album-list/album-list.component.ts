import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlbumService} from "../service/album.service";
import {Album} from "../model/album";
import {HttpErrorResponse} from "@angular/common/http";
import {SelectAlbumHelper} from "../util/select-album-helper";
import {SelectArtistHelper} from "../util/select-artist-helper";
import {Router} from "@angular/router";

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit, OnDestroy {
  albums?: Album[];

  constructor(private albumService: AlbumService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAlbums()
  }

  ngOnDestroy(): void {
    this.deleteSelectArtist();
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

  private getAlbums() {
    if (SelectArtistHelper.getArtistNameForLocalStorage()) {
      console.log('helper');
      this.getAlbumForArtist();
    } else {
      console.log('no helper');
      this.getAllAlbums();
    }
  }

  private getAlbumForArtist() {
    const artistName = SelectArtistHelper.getArtistNameForLocalStorage();
    console.log(artistName);
    this.albumService.findAllByArtist(artistName!).subscribe(
      (response: Album[]) => {
        this.albums = response;
      },
      (error: HttpErrorResponse) => {
        this.router.navigateByUrl("/artist_list")
        alert(error.error.message);
      }
    )
  }

  private deleteSelectArtist() {
    SelectArtistHelper.removeArtistnameForLocalCache();
  }
}
