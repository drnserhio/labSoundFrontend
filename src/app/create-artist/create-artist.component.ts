import { Component, OnInit } from '@angular/core';
import {NgModel} from "@angular/forms";
import {ArtistService} from "../service/artist.service";
import {Artist} from "../model/artist";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-artist',
  templateUrl: './create-artist.component.html',
  styleUrls: ['./create-artist.component.css']
})
export class CreateArtistComponent implements OnInit {
  imageFile?: File;
  url?: any;

  constructor(private artistService: ArtistService) { }

  ngOnInit(): void {
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

  createArtist(nameArtist: NgModel, title: NgModel) {
   const artistName =  nameArtist.control.value;
  const titles = title.control.value;
   if (titles) {
     const formData = this.artistService.createFormDataForCreateArtist(this.imageFile!, artistName, titles);

     this.artistService.createArtist(formData).subscribe(
       (response: Artist) => {
         alert("Create artist: " + response.artist)
         this.reloadPage();
       },
       (error: HttpErrorResponse) => {
         alert(error.error.message);
       }
     )
   } else {
     const formData = this.artistService.createFormDataForCreateAtristWithoutTitle(this.imageFile!, artistName);
     this.artistService.createArtistWithoutTitle(formData).subscribe(
       (response: Artist) => {
         alert("Create artist: " + response.artist)
         this.reloadPage();
       },
       (error: HttpErrorResponse) => {
         alert(error.error.message);
       }
     )
   }
  }

  private reloadPage() {
    window.location.reload();
  }
}
