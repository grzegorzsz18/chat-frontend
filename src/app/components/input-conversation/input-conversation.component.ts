import { Message } from './../message/message.component';
import { WebSocketService } from './../../services/web-socket.service';
import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { PrivateMessagesService } from '../../services/private-messages.service';

@Component({
  selector: 'app-input-conversation',
  templateUrl: './input-conversation.component.html',
  styleUrls: ['./input-conversation.component.css']
})
export class InputConversationComponent implements OnInit {

  @Input() conversationId;

  constructor(private http: HttpService,
  private messageService: PrivateMessagesService,
  private webSocket: WebSocketService) { }

  ngOnInit() {
  }

  sendMessage(input: any) {
    if (input.value === '') {return; }
    const message: Message = {
      autor: localStorage.getItem('nick'),
      text: input.value,
      conversationId: this.conversationId,
      isDisplayed: false,
      time: 0
    };
    input.value = '';
    this.webSocket.sendName(message);
  }

}
