import {Component, OnInit} from '@angular/core';
import {UserService} from "../service/user.service";
import {AuthService} from "../service/auth.service";
import {User} from "../model/user";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm, NgModel} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileUser?: User;
  private imageAvatar?: File;
  urlLoadImage?: any;
  flagUpdateProfile = true;

  constructor(private userService: UserService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getProfile();
  }

  private getProfile() {
    const sessionUsername = this.authService.getSessionUsernameForLocalCache()!;
    this.userService.getUserByUsername(sessionUsername).subscribe(
      (response: User) => {
        console.log(response)
        this.profileUser = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message);
      }
    )
  }

  onChangeImageModal() {
    // @ts-ignore
    $('#changeImage').modal('show')
  }

  openAndSaveImage(e: Event) {
    // @ts-ignore
    this.imageAvatar = (<HTMLInputElement>e.target).files[0];
    // @ts-ignore
    const reader = new FileReader();
    // @ts-ignore
    reader.readAsDataURL(e.target.files[0])
    reader.onload = (_event) => {
      this.urlLoadImage = reader.result;
    }
  }

  onUploadImage() {
    const formData = this.userService.createFormDataForUpdateImageAvatar(this.imageAvatar!);
    const sessionUsernameForLocalCache = this.authService.getSessionUsernameForLocalCache();
    this.userService.updateImage(sessionUsernameForLocalCache!, formData).subscribe(
      (response: boolean) => {
        if (response) {
          alert('Upload image successful for user: ' + sessionUsernameForLocalCache);
          this.getProfile();
        }
        this.closeChangeImageeModal();
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
      }
    )
  }

  closeChangeImageeModal() {
    // @ts-ignore
    $('#changeImage').modal('toggle');
    window.location.reload();
  }

  onUpdateProfile(user: User) {
    const sessionUsernameForLocalCache = this.authService.getSessionUsernameForLocalCache();
    console.log(user);
    this.userService.updateAccount(sessionUsernameForLocalCache!, user!).subscribe(
      (response: User) => {
        this.profileUser = response;
        this.authService.setSessionessionUsernameForLocalCache(response.username!);
        this.flagUpdateProfile = true;
      },
      (error: HttpErrorResponse) => {
        console.log(error.error.message);
      }
    )
  }


  onUpdatePassword(oldPass: string, newPass: string, confirmPass: string) {

    const sessionUsername = this.authService.getSessionUsernameForLocalCache()!;
    const formData = this.userService.creatFormDataForChangePassword(oldPass, newPass, confirmPass);
    this.userService.changeNewPassword(sessionUsername, formData).subscribe(
      (response: boolean) => {
        alert('Password change successful');
        // @ts-ignore
        document.getElementById('oldPassword')!.value = '';
        // @ts-ignore
        document.getElementById('newPassword')!.value = ''
        // @ts-ignore
        document.getElementById('confirmPassword')!.value = '';
      },
      (error: HttpErrorResponse) => {
        alert(error.error.message);
        if (error.error.message.startsWith('You put incorrect old password.')) {
          // @ts-ignore
          document.getElementById('oldPassword')!.value = '';
          document.getElementById('oldPassword')!.style.borderColor = 'red';
        }
        if (error.error.message.startsWith('New password and confirm don\'t same.Please put in correct.')) {
          // @ts-ignore
          document.getElementById('newPassword')!.value = ''
          document.getElementById('newPassword')!.style.borderColor = 'red';
          // @ts-ignore
          document.getElementById('confirmPassword')!.value = '';
          document.getElementById('confirmPassword')!.style.borderColor = 'red'
        }
        if (error.error.message.startsWith('You entry epmty password.Please put in correct.')) {
          document.getElementById('oldPassword')!.style.borderColor = 'red';
          document.getElementById('newPassword')!.style.borderColor = 'red';
          document.getElementById('confirmPassword')!.style.borderColor = 'red'
        }
      }
    )
  }

  onPress() {
    document.getElementById('oldPassword')!.style.borderColor = 'black';
    document.getElementById('newPassword')!.style.borderColor = 'black';
    document.getElementById('confirmPassword')!.style.borderColor = 'black'
  }

  onSettingsUpdateProfile() {
    if (this.flagUpdateProfile) {
      this.flagUpdateProfile = false;
    } else {
      this.flagUpdateProfile = true;
    }
  }
}
