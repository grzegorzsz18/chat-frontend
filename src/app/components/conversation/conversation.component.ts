import { Message } from './../message/message.component';
import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { PrivateMessagesService } from '../../services/private-messages.service';

export interface Conversation {
  conversationId: number;
  messages: Array<Message>;
  users: Array<String>;
}

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  @Input() conversation;
  public showConversation = false;
  messages: Array<Message> = new Array();
  page;

  constructor(private http: HttpService, private messagesService: PrivateMessagesService) { }

  ngOnInit() {
    this.messagesService.setConversationComponent(this.conversation.id, this);
    this.page = 1;
  }

  openConversation(event) {
    event.stopPropagation();
    this.showConversation = !this.showConversation;
    this.conversation.selected = false;
    if(this.showConversation && this.messages.length === 0) {this.getMessages(); }
  }

  getMessages() {
    this.http.getMessages(this.conversation.id, 0, 4).subscribe(data =>
    {
      if(data.status ===200){
        this.messages = data.json();
      }
    });
  }

  getListOfMessages(): Array<Message> {
    return this.messages;
  }

  setListOfMessages(messages: Array<Message>) {
    this.messages = messages;
  }

  onScroll() {
    this.http.getMessages(this.conversation.id, this.page, 4).subscribe(data =>
      {
        if(data.status ===200 && data.json().length > 0){
          for(let i of data.json()){
            this.messages.push(i);
          }
          this.page += 1;
        }
      });
  }

}
