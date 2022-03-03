import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Audio} from "../model/audio";

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private host = environment.host + '/audio';

  constructor(private http: HttpClient) {
  }


  public uploadAudio(formData: FormData): Observable<boolean> {
    return this.http.post<boolean>(`${this.host}/upload`, formData);
  }

  public createFormDataForUploadAudio(artist: string, album: string, soundName: string, file: File) {
    const formData = new FormData();
    formData.append("artist", artist);
    formData.append("album", album);
    formData.append("soundName", soundName);
    formData.append("file", file);
    return formData;
  }

  public getAudio(soundName: string): Observable<Audio> {
    return this.http.get<Audio>(`${this.host}/get/${soundName}`)
  }

  public getAllAudiosByArtist(artist: string): Observable<Audio[]> {
    return this.http.get<Audio[]>(`${this.host}/all_audio_by_artist/${artist}`);
  }

  public getAllAudiosByAlbumName(album: string): Observable<Audio[]> {
    return this.http.get<Audio[]>(`${this.host}/all_audio_by_album/${album}`);
  }

  public deleteAudio(soundName: string): Observable<boolean>{
  return this.http.delete<boolean>(`${this.host}/delete_audio/${soundName}`)
}
}
