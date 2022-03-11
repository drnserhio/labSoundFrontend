import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {User} from "../model/user";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public host = environment.host + '/usr';
  private token?: string;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  public loginIn(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.host}/login`, user, { observe: 'response'});
  }

  public registerAccount(user: User): Observable<User> {
    return this.http.post(`${this.host}/register`, user);
  }

  public saveTokenToLocalCache(accessToken: string) {
    this.token = accessToken;
    localStorage.setItem('access_token', accessToken);
  }

  private getTokenForLocalCache() {
    return localStorage.getItem('access_token');
  }

  private removeTokenInLocalCache() {
    localStorage.removeItem('access_token');
  }

  public loadToken() {
    this.token = this.getTokenForLocalCache()!;
  }

  public getToken() {
    return this.token
  }

  private saveSessionUsernameLocalCache(sessionUsername: string) {
    localStorage.setItem('sessionUsername', sessionUsername);
  }

  public getSessionUsernameForLocalCache() {
    return localStorage.getItem('sessionUsername');
  }

  public removeSessionUsernameInLocalCache() {
    localStorage.removeItem('sessionUsername');
  }

  public setSessionessionUsernameForLocalCache(sessionUsername: string) {
    localStorage.removeItem('sessionUsername');
    localStorage.setItem('sessionUsername', sessionUsername)
  }


  // @ts-ignore
  public isSignInSeccessful(): boolean {
    this.loadToken();
    if (this.token !== null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (this.jwtHelper.getTokenExpirationDate(this.token)) {
          this.saveSessionUsernameLocalCache(this.jwtHelper.decodeToken(this.token).sub!);
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
  }

  private logOut() {
    this.removeTokenInLocalCache();
    this.removeSessionUsernameInLocalCache();
  }

}

