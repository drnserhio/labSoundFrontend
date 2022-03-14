import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {SelectArtistHelper} from "../util/select-artist-helper";
import {AlbumService} from "../service/album.service";
import {Album} from "../model/album";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {ArtistService} from "../service/artist.service";
import {Artist} from "../model/artist";
import {ResponseTable} from "../model/response-table";

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent implements OnInit {
  url: any;
  private imageFile?: File;
  nameArtist?: string;
  artists?: Artist[];

  constructor(private albumService: AlbumService,
              private artistService: ArtistService,
              private router: Router) { }

  ngOnInit(): void {
    this.allArtists();
  }

  createAlbum(albumForm: NgForm) {
    console.log(albumForm);
   const albName = albumForm.value.albumName;
   const art =  albumForm.value.artist;
   const year = albumForm.value.yearRelease;
   const formData = this.albumService.createFormDataForCreateAlbum(this.imageFile!, art, year);
   console.log(formData);
   this.albumService.createAlbum(formData, albName).subscribe(
     (response: Album) => {
       alert("create album : " + response.albumName)
       this.reloadPage();
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

  private allArtists() {
    this.artistService.getArtists().subscribe(
      (response: Artist[]) => {
        this.artists = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message);
      }
    );
  }

  private reloadPage() {
    window.location.reload();
  }
}
