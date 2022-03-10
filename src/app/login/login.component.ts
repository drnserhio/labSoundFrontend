import { Component, OnInit } from '@angular/core';
import {User} from "../model/user";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public signIn(user: User){
    this.authService.loginIn(user).subscribe(
      (response: HttpResponse<User>) => {
        let accessToken = response.headers.get('access_token');
        this.authService.saveTokenToLocalCache(accessToken!);
        this.router.navigateByUrl('/artist_list');
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
      }
    )
  }

}
