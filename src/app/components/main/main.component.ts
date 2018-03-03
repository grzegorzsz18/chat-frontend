import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { Input } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {


  user = {
    email: "",
    nick: ""
  };

  users: Array<any>;

  constructor(private router: Router, private http: HttpService) {
       if (localStorage.getItem("token_access") == null) {
     this.router.navigate(["login"]);
   }
   this.user.email = localStorage.getItem("userEmail");

   this.http.getUsers("", 0, 10).subscribe(data => {
    if (data.status === 200) {
      this.users = data.json();
    }
  }, err => {
    this.http.refreshSession(); });
  }

  ngOnInit() {
    this.http.getUserNick(this.user.email).subscribe((data: any) => {
      if (data.status === 200) {
         this.user.nick = data._body;
      }},
      err => {
      this.http.refreshSession();
      });
  }

  public searchUsers(value) {
    this.http.getUsers(value, 0, 10).subscribe(data => {
        if (data.status === 200) {
          this.users = data.json();
        }},
        err => {
        this.http.refreshSession();
        });
}

}
