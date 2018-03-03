import { Ng2ImgMaxModule } from 'ng2-img-max';
import { PhotoService } from './services/photo.service';
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
import { ConversationComponent } from './components/conversation/conversation.component';
import { MessageComponent } from './components/message/message.component';
import { InputConversationComponent } from './components/input-conversation/input-conversation.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    PersonComponent,
    ConversationComponent,
    MessageComponent,
    InputConversationComponent
  ],
  imports: [
    HttpModule, BrowserModule, HttpClientModule, Ng2ImgMaxModule, RouterModule.forRoot(routes, {useHash: true})
  ],
  providers: [HttpService, PhotoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
