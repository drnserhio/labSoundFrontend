import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {User} from "../model/user";
import {HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService,
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

}
