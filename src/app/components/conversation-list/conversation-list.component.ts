import { HttpService } from './../../services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit {

  constructor(private http: HttpService) { }

  conversations: any;

  ngOnInit() {
    this.http.getConversations(0, 10).subscribe(
      data => {
        //todo
        console.log(this.conversations);
      }
    );
  }

}
