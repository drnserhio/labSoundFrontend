import {Component, OnInit} from '@angular/core';
import {SelectAlbumHelper} from "../util/select-album-helper";
import {AudioService} from "../service/audio.service";
import {Audio} from "../model/audio";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-select-album',
  templateUrl: './select-album.component.html',
  styleUrls: ['./select-album.component.css']
})
export class SelectAlbumComponent implements OnInit {

  private selectAlbum?: string;
  audio?: Audio[];
  private aud?: Audio;

  constructor(private audioService: AudioService) {
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
        console.log(error.message);
      }
    )
  }

  onSelectAudio(soundName: string) {
    this.audioService.getAudio(soundName).subscribe(
      (response) => {
        this.aud = JSON.parse(response);
      },
      (response: HttpErrorResponse) => {
        console.log(response);
      }
    )
    return undefined;
  }
}
