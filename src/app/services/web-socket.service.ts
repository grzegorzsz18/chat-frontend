import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { PrivateMessagesService } from './private-messages.service';


@Injectable()
export class WebSocketService {

  ws: any;
  disabled: boolean;

  constructor(private messageService: PrivateMessagesService) {
    this.connect();
  }


  connect() {
    const socket = new WebSocket("ws://localhost:1818/socket");
    this.ws = Stomp.over(socket);
    const that = this;
    this.ws.connect({}, function(frame) {
      that.ws.subscribe("/user/" + localStorage.getItem('nick'), function(message) {
        console.log("Error " + message);
      });
      that.ws.subscribe("/user/" + localStorage.getItem('nick'), function(message) {
        that.reciveMessage(message);
      });
      that.disabled = true;
    }, function(error) {
      console.log("STOMP error " + error);
    });
  }

  disconnect() {
    if (this.ws != null) {
      this.ws.ws.close();
    }
    this.setConnected(false);
    console.log("Disconnected");
  }

  sendName(message, conversationId) {
    const data = JSON.stringify({
      conversationId: conversationId,
      message : message,
      autor: localStorage.getItem('nick')
    });
    this.ws.send("/app/send/message/" + conversationId, {}, data);
  }

  reciveMessage(message) {
    message = JSON.parse(message.body);
    this.messageService.addNewMessageToConversationFromNotification(message.message, message.conversationId, message.autor);
  }

  setConnected(connected) {
    this.disabled = connected;
  }


}
