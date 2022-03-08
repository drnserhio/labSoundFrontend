import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlbumService} from "../service/album.service";
import {Album} from "../model/album";
import {HttpErrorResponse} from "@angular/common/http";
import {SelectAlbumHelper} from "../util/select-album-helper";
import {SelectArtistHelper} from "../util/select-artist-helper";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AudioService} from "../service/audio.service";

@Component({
  selector: 'app-album-list',
  templateUrl: './album-list.component.html',
  styleUrls: ['./album-list.component.css']
})
export class AlbumListComponent implements OnInit, OnDestroy {
  albums?: Album[];
  updateAlbum?: Album;
  url?: any;
  private imageFile?: File;
  albumNameForAddAudio?: string;
  artistNameForAddAudio?: string;
  private audioFile?: File;

  constructor(private albumService: AlbumService,
              private audioService: AudioService,
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

  onSelectedAlbumToUpdate(albumName: string) {
    this.albumService.findByAlbum(albumName).subscribe(
      (response: Album) => {
        this.updateAlbum = response;
        // @ts-ignore
        $('#updateAlbum').modal('show')
      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message);
      }
    )
  }

  onSelectImage(e: Event) {
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

  OnSelectAndUpdateAlbum(updateAlb: NgForm) {
    const albumName =  updateAlb.value.albumName;
    const art =  updateAlb.value.artist;
    const year =  updateAlb.value.yearRelease;
    if (this.imageFile == null) {
      const formData = this.albumService.createFormDataForUpdateAlbumInfo(art, year);
      this.albumService.updateAlbumInfo(formData, albumName).subscribe(
        (response: Album) => {
          console.log("Update succesful: " + response.albumName)
          window.location.reload()
        },
        (error: HttpErrorResponse) => {
          console.log(error.error.message);
        }
      )
    } else {
      const formData = this.albumService.createFormDataForUpdateAlbum(this.imageFile, art, year);
      this.albumService.updateAlbum(formData, albumName).subscribe(
        (response: Album) => {
          console.log("Update succesful: " + response.albumName)
          this.imageFile = null!;
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          console.log(error.error.message);
        }
      )
    }
  }

  onSelectAlbumForAddAudio(albumName: string, artist: string) {
    this.albumNameForAddAudio = albumName;
    this.artistNameForAddAudio = artist;
    // @ts-ignore
    $('#uploadAudio').modal('show')
  }

  addNewAudioForAlbum(uploadAud: NgForm) {
    console.log(uploadAud)
    let soundName = uploadAud.value.soundName;
    let formData = this.audioService.createFormDataForUploadAudio(this.artistNameForAddAudio!, this.albumNameForAddAudio!, soundName!, this.audioFile!);
    this.audioService.uploadAudio(formData).subscribe(
      (response: boolean) => {
        if (response) {
          alert("upload successful");
          // @ts-ignore
          $('#uploadAudio').modal('toggle')
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message);
      }
    )

  }

  onSelectAudioFile(e: Event) {
    // @ts-ignore
    this.audioFile = (<HTMLInputElement>e.target).files[0];
  }
}
