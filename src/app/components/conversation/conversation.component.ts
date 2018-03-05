import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  @Input() conversation;
  public showConversation = false;
  message = {
    text : "sdsdds",
    autor: "autor",
    time: "1212"
  };

  constructor() { }

  ngOnInit() {
  }

  openConversation(event) {
    event.stopPropagation();
    this.showConversation = !this.showConversation;
    this.conversation.selected = false;
  }

}
