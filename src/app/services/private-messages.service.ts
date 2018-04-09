import { ConversationComponent } from './../components/conversation/conversation.component';
import { ConversationListComponent } from './../components/conversation-list/conversation-list.component';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Subject } from 'rxjs/Subject';
import { WebSocketService } from './web-socket.service';
import { Message } from '../components/message/message.component';

@Injectable()
export class PrivateMessagesService {

  constructor(private http: HttpService) {

  }

  conversations;
  conversationListComponent: ConversationListComponent;
  conversationComponents = new Map<number, ConversationComponent>();
  public messages: Subject<any>;


  setConversations(conversations, conversationComponent: ConversationListComponent) {
    this.conversations = conversations;
    this.conversationListComponent = conversationComponent;
  }

  setConversationComponent(id: number, component: ConversationComponent) {
    this.conversationComponents.set(id, component);
  }

  openConversation(nick: String) {
    const id = this.findUserInConversations(nick);
    if (id !== -1) {
      this.conversations[id].selected = true;
      let con = this.conversations[id];
      this.conversations.splice(id, 1);
      this.conversations.unshift(con);
      this.conversationListComponent.setConversations(this.conversations);
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

  addNewMessageToConversation(message: Message) {
    if (this.conversationComponents.has(message.conversationId)) {
      this.conversationComponents.get(message.conversationId).addNewMessage(message);
    }else {
      this.conversationListComponent.refresh();
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
