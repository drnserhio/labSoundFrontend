import { Component, OnInit } from '@angular/core';
import {UserService} from "../service/user.service";
import {AuthService} from "../service/auth.service";
import {User} from "../model/user";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private profileUser?: User;

  constructor(private userService: UserService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getProfile();
  }

  private getProfile() {
    const sessionUsername = this.authService.getSessionUsernameForLocalCache()!;

    this.userService.getUserByUsername(sessionUsername).subscribe(
      (response: User) => {
        this.profileUser = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
      }
    )
  }
}
