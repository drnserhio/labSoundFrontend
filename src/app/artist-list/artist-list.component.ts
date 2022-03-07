import { Component, OnInit } from '@angular/core';
import {ArtistService} from "../service/artist.service";
import {Artist} from "../model/artist";
import {HttpErrorResponse} from "@angular/common/http";
import {SelectArtistHelper} from "../util/select-artist-helper";
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {
  artists?: Artist[];

  constructor(private artistService: ArtistService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllArtist();
  }


  private getAllArtist() {
    this.artistService.getAllArtist().subscribe(
      (response: Artist[]) => {
        this.artists = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    )
  }

  onSelectArtist(artist: string) {
    SelectArtistHelper.selectArtisNametSaveToLocalStorage(artist);
    this.router.navigateByUrl('/albums_list');
  }
}
