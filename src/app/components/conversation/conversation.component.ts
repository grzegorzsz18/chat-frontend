import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  @Input() conversation;
  public showConversation = false;
  messages = [];
  page;

  constructor(private http: HttpService) { }

  ngOnInit() {
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

  onScroll() {
    this.http.getMessages(this.conversation.id, this.page, 4).subscribe(data =>
      {
        if(data.status ===200 && data.json().length > 0){
          for(let i of data.json()){
            this.messages.push(i);
          }
          console.log(this.messages);
          this.page += 1;
        }
      });
  }

}
