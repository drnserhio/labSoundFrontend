import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {User} from "../model/user";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {UserService} from "../service/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  public register(user: User) {
    this.authService.registerAccount(user).subscribe(
      (response: User) => {
        alert("Succesfull register");
        this.router.navigateByUrl('/login');
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
      }
    )
  }

  onRegister(user: User) {
    this.authService.registerAccount(user).subscribe(
      (response: User) => {
        alert("User registered successful " + user.username);
        this.loginAfterRegister(user);
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
      }
    )
  }

  private signIn(user: User){
    this.authService.loginIn(user).subscribe(
      (response: HttpResponse<User>) => {
        const accessToken = response.headers.get('access_token');
        this.authService.saveTokenToLocalCache(accessToken!);
        this.router.navigateByUrl('/artist_list');
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
      }
    )
  }

  private loginAfterRegister(user: User) {
    this.signIn(user);
  }
}
