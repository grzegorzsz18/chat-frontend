import { HttpService } from './http.service';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PhotoService {

  constructor(private http: HttpService) { }

  postProfilePicture(email: String, fileToUpload: File) {
    return this.http.uploadProfilePicture(email, fileToUpload);
  }

}
