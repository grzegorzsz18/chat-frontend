import { PhotoService } from './services/photo.service';
import { AuthService } from './services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";
import { HttpService } from './services/http.service';
import { Http, HttpModule } from '@angular/http';
import { MainComponent } from './components/main/main.component';
import { PersonComponent } from './components/person/person.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    PersonComponent
  ],
  imports: [
    HttpModule, BrowserModule, HttpClientModule, RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [AuthService, HttpService, PhotoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
