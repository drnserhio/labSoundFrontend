import {Component, OnInit} from '@angular/core';
import {ArtistService} from "../service/artist.service";
import {Artist} from "../model/artist";
import {HttpErrorResponse} from "@angular/common/http";
import {SelectArtistHelper} from "../util/select-artist-helper";
import {Router} from "@angular/router";
import {ResponseTable} from "../model/response-table";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css']
})
export class ArtistListComponent implements OnInit {

  page = 0;
  size = 3;
  responseTable?: ResponseTable<Artist>;

  constructor(private artistService: ArtistService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllArtist();
  }


  private getAllArtist() {
    const formData = this.artistService.creatFormDataForGetAll(this.page, this.size);
    this.artistService.getAllArtist(formData).subscribe(
      (response: ResponseTable<Artist>) => {
        console.log(response);
        this.responseTable = response;
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

  previousPage() {
    console.log('previous');
    this.page -= 1
    this.getAllArtist();
  }

  nextPage() {
    console.log('next');
    this.page += 1
    this.getAllArtist();
  }
}
