import {Component, OnInit} from '@angular/core';
import {SelectAlbumHelper} from "../util/select-album-helper";
import {AudioService} from "../service/audio.service";
import {Audio} from "../model/audio";
import {HttpErrorResponse} from "@angular/common/http";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Router} from "@angular/router";


@Component({
  selector: 'app-select-album',
  templateUrl: './select-album.component.html',
  styleUrls: ['./select-album.component.css']
})

export class SelectAlbumComponent implements OnInit {

  private selectAlbum?: string;
  audio?: Audio[];
  trustedUrl?: SafeUrl;

  constructor(private router: Router,
              private audioService: AudioService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.onClickSelectAlbum();
    this.getAllAudioByAlbumName();
  }

  private onClickSelectAlbum() {
    this.selectAlbum = SelectAlbumHelper.getAlbumNameForLocalStorage()!;
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
}

