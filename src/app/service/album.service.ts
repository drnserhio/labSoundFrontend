import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Album} from "../model/album";
import {Artist} from "../model/artist";

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private host = environment.host + '/album';
  private searchHost = environment.host + '/search'

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

  public updateAlbumInfo(formData: FormData, albumName: string): Observable<Album> {
    return this.http.put(`${this.host}/update_album_info/${albumName}`, formData)
  }

  public createFormDataForUpdateAlbumInfo(artist: string, yearRelease: string) {
    const formData = new FormData();
    formData.append("artist", artist);
    formData.append("yearRelease", yearRelease);
    return formData;
  }




  public findByAlbum(albumName: string): Observable<Album> {
    return this.http.get(`${this.host}/get_album/${albumName}`)
  }

  public findAllByArtist(artist: string, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.host}/get_all_album_artist/${artist}`, formData);
  }

  public createFormDataForFindAllByArtist(page: number, size: number, column: string) {
    const formData = new FormData();
    formData.append("page", JSON.stringify(page));
    formData.append("size", JSON.stringify(size));
    formData.append("column", column);
    return formData;
  }

  public findAllAlbum(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.host}/all_albums`, formData);
  }

  public createFormDataForFindAll(page: number, size: number, column: string) {
    const formData = new FormData();
    formData.append("page", JSON.stringify(page));
    formData.append("size", JSON.stringify(size));
    formData.append("column", column);
    return formData;
  }


  public deleteAlbum(album: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.host}/delete_album/${album}`)
  }

  public searchTermAlbum(searchTerm: string): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.searchHost}/get/albums/${searchTerm}`);
  }
}
