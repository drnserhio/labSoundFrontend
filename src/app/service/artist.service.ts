import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Artist} from "../model/artist";

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  private host = environment.host + '/artist';
  private searchHost = environment.host + '/search'

  constructor(private http: HttpClient) {
  }


  public createArtist(formData: FormData): Observable<Artist> {
    return this.http.post<Artist>(`${this.host}/create`, formData);
  }

  public createFormDataForCreateArtist(fileImage: File, artist: string, title: string) {
    const formData = new FormData();
    formData.append("fileImage", fileImage);
    formData.append("artist", artist);
    formData.append("title", title);
    return formData;
  }

  public createArtistWithoutTitle(formData: FormData): Observable<Artist> {
    return this.http.post(`${this.host}/create_artist`, formData);
  }

  public createFormDataForCreateAtristWithoutTitle(fileImage: File, artist: string) {
    const formData = new FormData();
    formData.append("fileImage", fileImage);
    formData.append("artist", artist);
    return formData;
  }


  public updateArtist(fromData: FormData): Observable<Artist> {
    return this.http.put(`${this.host}/update`, fromData);
  }

  public createFormDataForUpdateArtist(fileImage: File, artist: string, title: string) {
    const formData = new FormData();
    formData.append("fileImage", fileImage);
    formData.append("artist", artist);
    formData.append("title", title);
    return formData;
  }

  public updateArtistWithoutTitle(formData: FormData): Observable<Artist> {
    return this.http.put(`${this.host}/update_artist`, formData);
  }

  public createFormDataForUpdateArtistWithoutTitle(fileImage: File, artist: string) {
    const formData = new FormData();
    formData.append("fileImage", fileImage);
    formData.append("artist", artist);
    return formData;
  }

  public deleteArtist(artistName: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.host}/delete_artist/${artistName}`);
  }


  public findByArtist(artistName: string): Observable<Artist> {
    return this.http.get<Artist>(`${this.host}/get_artist/${artistName}`);
  }

  public getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.host}/all_list`);
  }

  public getAllArtist(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.host}/all_artist`, formData);
  }

  public creatFormDataForGetAll(page: number, size: number) {
    const formData = new FormData();
    formData.append("page", JSON.stringify(page));
    formData.append("size", JSON.stringify(size));
    return formData;
  }

  public searchTermArtist(searchTerm: string): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.searchHost}/get/artists/${searchTerm}`);
  }

}

