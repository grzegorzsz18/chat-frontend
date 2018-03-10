import { ConversationListComponent } from './../components/conversation-list/conversation-list.component';
import { Injectable } from '@angular/core';
import { ConversationComponent } from '../components/conversation/conversation.component';
import { HttpService } from './http.service';

@Injectable()
export class PrivateMessagesService {

  constructor(private http: HttpService) { }

  conversations;
  conversationComponent: ConversationListComponent;

  setConversations(conversations, conversationComponent: ConversationListComponent) {
    this.conversations = conversations;
    this.conversationComponent = conversationComponent;
  }

  openConversation(nick: String) {
    const id = this.findUserInConversations(nick);
    if (id !== -1) {
      this.conversations[id].selected = true;
      let con = this.conversations[id];
      this.conversations.splice(id, 1);
      this.conversations.unshift(con);
      this.conversationComponent.setConversations(this.conversations);
    }else {
      this.http.addNewConversation(nick).subscribe((data: any) => {
        data = data.json();
        const conversation = {
          id: data.id ,
          users: data.users,
          selected: true
        };
        this.conversations.unshift(conversation);
      });
    }
  }

  findUserInConversations(nick: String) {
    for (let i = 0 ; i < this.conversations.length; i++) {
      if (this.conversations[i].users.length === 2 && (this.conversations[i].users[0].nick === nick ||
         this.conversations[i].users[1].nick === nick)) {
        return i;
      }
    }
    return -1;
  }

}
