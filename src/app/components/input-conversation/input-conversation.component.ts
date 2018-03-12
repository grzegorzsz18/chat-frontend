import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-input-conversation',
  templateUrl: './input-conversation.component.html',
  styleUrls: ['./input-conversation.component.css']
})
export class InputConversationComponent implements OnInit {

  @Input() conversationId;

  constructor(private http: HttpService) { }

  ngOnInit() {
  }

  sendMessage(text: String) {
    this.http.sendMessage(text, this.conversationId).subscribe((data) =>
  {
    //todo add to list
    console.log(data);
  });
  }

}
