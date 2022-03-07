import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {SelectArtistHelper} from "../util/select-artist-helper";
import {AlbumService} from "../service/album.service";
import {Album} from "../model/album";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent implements OnInit, OnDestroy {
  url: any;
  private imageFile?: File;
  nameArtist?: string;

  constructor(private albumService: AlbumService,
              private router: Router) { }

  ngOnInit(): void {
    this.nameArtistIfExists();
  }

  ngOnDestroy(): void {
    this.deleteSelectArtisr();
  }

  createAlbum(albumForm: NgForm) {
   const albName = albumForm.value.albumName;
   const art =  albumForm.value.artist;
   const year = albumForm.value.yearRelease;
   const formData = this.albumService.createFormDataForCreateAlbum(this.imageFile!, art, year);
   console.log(formData);
   this.albumService.createAlbum(formData, albName).subscribe(
     (response: Album) => {
       alert("create album : " + response.albumName)
       this.router.navigateByUrl('/albums_list');
     },
     (error: HttpErrorResponse) => {
       console.log(error.error.message);
     }
   )
  }

  onSelectImage(e: Event) {
    //TODO: valitation image size

    // @ts-ignore
    this.imageFile = (<HTMLInputElement>e.target).files[0];
    // @ts-ignore
    const reader = new FileReader();
    // @ts-ignore
    reader.readAsDataURL(e.target.files[0])
    reader.onload = (_event) => {
      this.url = reader.result;
    }
  }

  private deleteSelectArtisr() {
    SelectArtistHelper.removeArtistnameForLocalCache();
  }

  private nameArtistIfExists() {
    if (SelectArtistHelper.getArtistNameForLocalStorage()) {
      this.nameArtist = SelectArtistHelper.getArtistNameForLocalStorage()!;
    }
  }
}
