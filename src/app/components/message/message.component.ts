import { Component, OnInit, Input } from '@angular/core';

export interface Message {
  conversationId: number;
  text: String;
  autor: String;
  time: number;
  isDisplayed: boolean;
}


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent implements OnInit {

@Input() message: any;

  constructor() { }

  ngOnInit() {

  }

}
