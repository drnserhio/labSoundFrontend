import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private host = environment.host + "/usr";

  constructor(private http: HttpClient) {
  }

  public updateAccount(currentUsername: string, user: User): Observable<User> {
    return this.http.put(`${this.host}/update_account/${currentUsername}`, user);
  }


  public resetPassword(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.host}/reset_password`, email);
  }

  public removeAccount(username: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.host}/delete/${username}`);
  }

  public getUserByUsername(username: string): Observable<User> {
    return this.http.get(`${this.host}/get_username/${username}`);
  }

  public getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.host}/get_email/${email}`);
  }

  public updateImage(username: string, formData: FormData): Observable<boolean> {
    return this.http.post<boolean>(`${this.host}/update_image/${username}`, formData);
  }

  public createFormDataForUpdateImageAvatar(imageAvatar: File) {
    const formData = new FormData();
    formData.append("imageAvatar", imageAvatar);
    return formData;
  }

  public changeNewPassword(username: string, formData: FormData): Observable<boolean> {
    return this.http.post<boolean>(`${this.host}/change_password/${username}`, formData);
}

  creatFormDataForChangePassword(oldPass: string, newPass: string, confirmPass: string) {
    const formData = new FormData();
    formData.append("oldPassword", oldPass);
    formData.append("newPassword", newPass);
    formData.append("confirmPassword", confirmPass);
    return formData;
  }
}
