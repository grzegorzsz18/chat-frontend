import { PhotoService } from './../../services/photo.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { error } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorNewUser = "";
  info = "";
  fileToUpload: File = null;
  readyForSubmit = false;
  constructor(private authService: AuthService
    , private http: HttpService
    , private photoService: PhotoService
    , private router: Router) { }

  ngOnInit() {
  }

  login(email, password) {
    this.authService.login(email, password).subscribe(
      (data: any) => {
        if (data.status === 200) {
          const token = {
            access: data.json().access_token,
            refresh : data.json().refresh_token
          };
          this.http.setTokens(token, email);
          this.router.navigate(["main"]);
        }
      }
    );
  }

  register(email: String, nick: String, password, passwordConf) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())) {
      this.errorNewUser = "please put correct email";
      return;
    }

    if (nick.length < 3) {
      this.errorNewUser = 'nick should has min 3 characters';
      return;
    }
    if (password !== passwordConf) {
      this.errorNewUser = 'password are not the same';
      return;
    }
    this.http.registerNewUser(email, nick, password).subscribe(
      data => {
          if (data.status === 201) {
            this.info = 'succesfully created new user';
            this.errorNewUser = "";
            this.uploadFileToActivity(email);
          }
      },
      err => {
        this.info = "";
        this.errorNewUser = err._body;
      }
    );
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.readyForSubmit = true;
}

uploadFileToActivity(email) {
  this.photoService.postProfilePicture(email, this.fileToUpload).subscribe(data => {
  }, error => {
    console.log(error);
  });
}

}
