import {ResponseContentType, RequestOptions,  Headers,  Http} from '@angular/http';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const address = "http://localhost:1818";
const aClient = "client"
const aPassword = "clientpassword"

@Injectable()
export class HttpService {

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

public refreshSession() {
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', localStorage.getItem('token_refresh'));
  const headers = new Headers(
    {
   'Content-type': 'application/x-www-form-urlencoded',
   'Authorization': 'Basic ' + btoa(aClient + ":" + aPassword)}
  );
  const options = new RequestOptions({ headers: headers });
  this.http.post(address + '/oauth/token', params.toString(), options).subscribe(
    (data: any) => {
      if (data.status === 200) {
          localStorage.setItem('token_access', data.json().access_token);
      }
    },
  err => {
    this.router.navigate(["login"]);
  });
}

public setTokens(token, email) {

  localStorage.setItem('token_access', token.access);
  localStorage.setItem('token_refresh', token.refresh);
  localStorage.setItem('userEmail', email);
}

public registerNewUser(email, nick, password) {

  return this.http.put(address + '/user/new' + '?email=' + email + '&password=' + password + '&nick=' + nick, {});
}

public uploadProfilePicture(email, file: File) {
  const formData: FormData = new FormData();
  formData.append('fileKey', file, file.name);
  formData.append('email', email);
  return this.http
    .post(address + '/picture', formData);
}


public getImage(email: string): Observable<File> {
  const options = new RequestOptions({ headers: this.getAuthHeader(), responseType: ResponseContentType.Blob});
  return this.http
      .get(address + '/picture/' + email, options)
      .map((res: any) => res.blob());
}

public getUserNick(email) {
  const options = new RequestOptions({ headers: this.getAuthHeader()});
  return this.http.get(address + '/user/nick?email=' + email, options);
}

public getUsers(nick, page, limit) {
  const options = new RequestOptions({ headers: this.getAuthHeader() });
  return this.http.get(address + '/user/users?page=' + page + '&limit=' + limit + '&nick=' + nick, options);
}


public getConversations(page, limit) {
  const options = new RequestOptions({ headers: this.getAuthHeader() });
  return this.http
  .get(address + '/conversation/user?page=' + page + '&limit=' + limit + '&email=' + localStorage.getItem('userEmail'), options);
}

private getAuthHeader(): Headers {
  return new Headers(
    {
      'Content-type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer' + localStorage.getItem('token_access') }
  );
}

public failure(err) {
  if (err.status === 401) {
    this.refreshSession();
}
}
}

