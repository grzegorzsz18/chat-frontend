import { RequestOptions, Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

const address = "http://localhost:1818";
const aClient = "client"
const aPassword = "clientpassword"

@Injectable()
export class HttpService {

  private accessToken: String = "";
  private refreshToken: String = "";

constructor(private http: Http, private router: Router) {
 }

public login(email, password) {
  const params = new URLSearchParams();
  params.append('username', email);
  params.append('password', password);
  params.append('grant_type', 'password');
  const headers = new Headers(
    {
   'Content-type': 'application/x-www-form-urlencoded',
   'Authorization': 'Basic ' + btoa(aClient + ":" + aPassword)}
  );
  const options = new RequestOptions({ headers: headers });
  return this.http.post(address + '/oauth/token', params.toString(), options);
}

public setTokens(token) {
  this.accessToken = token.access;
  this.refreshToken = token.refresh;

  localStorage.setItem("token_access", token.access);
  localStorage.setItem("token_refresh", token.refresh);
}

public registerNewUser(email, nick, password) {

  return this.http.put(address + '/user/new' + '?email=' + email + '&password=' + password + '&nick=' + nick, {});
}

public uploadProfilePicture(email, file: File) {
  const formData: FormData = new FormData();
  formData.append('fileKey', file, file.name);
  formData.append('email', email);
  console.log(formData);
  return this.http
    .post(address + '/user/picture', formData);
}
}

