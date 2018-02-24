import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  user = {
    nick: "imie"
  };

  constructor(private router: Router) {
       if (localStorage.getItem("token_access") == null) {
     this.router.navigate(["login"]);
   }
   }

  ngOnInit() {
  }

}
