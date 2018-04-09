import { PrivateMessagesService } from './../../services/private-messages.service';
import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit {

  constructor(private http: HttpService, private messageService: PrivateMessagesService) { }

  conversations: Array<any> = [];
  public showConversationsList = true;

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.conversations = [];
    this.http.getConversations(0, 10).subscribe(
      data => {
        const conversations = data.json();
        for (let i = 0 ; i < conversations.length; i ++) {
          const conversation = {
            id: conversations[i].id ,
            users: conversations[i].users,
            selected: false
          };
          this.conversations.push(conversation);
        }
      }
    );
    this.messageService.setConversations(this.conversations, this);
  }

  public setConversations(conversations) {
    this.conversations = conversations;
  }

  public getConversations() {
    return this.conversations;
  }
}
