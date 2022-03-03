import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Album} from "../model/album";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private host = environment.host + '/album';

  constructor(private http: HttpClient) {
  }

  public createAlbum(formData: FormData, albumName: string): Observable<Album> {
    return this.http.post(`${this.host}/create_album/${albumName}`, formData)
  }

  public createFormDataForCreateAlbum(imageFile: File, artist: string, yearRelease: string) {
    const formData = new FormData();
    formData.append("imageFile", imageFile);
    formData.append("artist", artist);
    formData.append("yearRelease", yearRelease);
    return formData;
  }

  public updateAlbum(formData: FormData, albumName: string): Observable<Album> {
    return this.http.put(`${this.host}/update_album/${albumName}`, formData);
  }

  public createFormDataForUpdateAlbum(imageFile: File, artist: string, yearRelease: string) {
    const formData = new FormData();
    formData.append("imageFile", imageFile);
    formData.append("artist", artist);
    formData.append("yearRelease", yearRelease);
    return formData;
  }

  public findByAlbum(albumName: string): Observable<Album> {
    return this.http.get(`${this.host}/get_album/${albumName}`)
  }
  public findAllByArtist(artist: string): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.host}/get_all_album_artist/${artist}`);
  }

  public findAllAlbum(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.host}/all_albums`);
  }

  public deleteAlbum(album: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.host}/delete_album/${album}`)
}
}
