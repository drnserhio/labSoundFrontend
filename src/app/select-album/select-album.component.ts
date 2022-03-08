import {Component, OnDestroy, OnInit} from '@angular/core';
import {SelectAlbumHelper} from "../util/select-album-helper";
import {AudioService} from "../service/audio.service";
import {Audio} from "../model/audio";
import {HttpErrorResponse} from "@angular/common/http";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {ArtistService} from "../service/artist.service";
import {Artist} from "../model/artist";
import {Observable} from "rxjs";
import {AlbumService} from "../service/album.service";
import {Album} from "../model/album";


@Component({
  selector: 'app-select-album',
  templateUrl: './select-album.component.html',
  styleUrls: ['./select-album.component.css']
})

export class SelectAlbumComponent implements OnInit, OnDestroy {

  private selectAlbum?: string;
  audio?: Audio[];
  trustedUrl?: SafeUrl;
  public albumSave?: Album;
  private deleteAudioName?: string;

  constructor(private router: Router,
              private albumService: AlbumService,
              private audioService: AudioService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.onClickSelectAlbum();
    this.getAllAudioByAlbumName();
  }

  ngOnDestroy(): void {
    this.deleteAlbumSelectForLocalCache();
  }

  private onClickSelectAlbum() {
    this.selectAlbum = SelectAlbumHelper.getAlbumNameForLocalStorage()!;
    console.log(this.selectAlbum)
  }

  private getAllAudioByAlbumName() {
    this.audioService.getAllAudiosByAlbumName(this.selectAlbum!).subscribe(
      (resposne: Audio[]) => {
        this.audio = resposne;
      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message);
        alert(error.error.message);
        this.router.navigateByUrl('/albums_list');
      }
    )
  }

  onSelectAudio(soundName: string) {
    console.log(soundName);
    this.audioService.getAudio(soundName).subscribe(
      (response) => {
        // @ts-ignore
        document.getElementById("audioId").load();
        var blob = new Blob([response], {type: 'audio/mpeg'})
        this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
        // @ts-ignore
        document.getElementById("audioId").play()
      }
    )
  }


  stopAudio() {
    // @ts-ignore
    document.getElementById("audioId").pause();
    // @ts-ignore
    document.getElementById("audioId").currentTime = 0;
  }

  private getAlbum() {
   this.albumService.findByAlbum(this.selectAlbum!).subscribe(
     (response: Album) => {
       this.albumSave = response;
     },
     (error: HttpErrorResponse) => {
       console.log(error.message);
     }
   );
  }

  private deleteAlbumSelectForLocalCache() {
    SelectAlbumHelper.deleteAlbumNameForLocalCache();
  }

  onModalAudioRemove(soundName: string) {
    // @ts-ignore
    $('#removeAudio').modal('show')
    this.deleteAudioName = soundName;
    // $('#removeAudio').modal('toggle')
  }

  closeRemoveModal() {
    // @ts-ignore
    $('#removeAudio').modal('toggle')
  }

  onDeleteAudio() {
    this.audioService.deleteAudio(this.deleteAudioName!).subscribe(
      (response: boolean) => {
        if (response) {
          alert("delete successful");
          this.getAllAudioByAlbumName();
          // @ts-ignore
          $('#removeAudio').modal('toggle')
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message);
      }
    )
  }
}

