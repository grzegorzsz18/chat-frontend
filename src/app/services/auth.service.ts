import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class AuthService {

  constructor(private httpService: HttpService) { }

  login(email, password) {
    return this.httpService.login(email, password);
  }

}
