import { error } from 'util';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Ng2ImgMaxModule, Ng2ImgMaxService } from 'ng2-img-max';
import { PrivateMessagesService } from '../../services/private-messages.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  @Input() userData: any;
  @Input() isList: boolean;
  imageToShow: any;

  constructor(private httpService: HttpService,
     private ng2ImgMaxService: Ng2ImgMaxService,
     private messageservice: PrivateMessagesService) {
  }

  ngOnInit() {
    this.getImageFromService();
  }

  createImageFromBlob(image: Blob) {
         let reader = new FileReader();

         reader.addEventListener("load", () => {


            this.imageToShow = reader.result;
         }, false);

         if (image) {
            reader.readAsDataURL(image);
         }
  }

  getImageFromService() {
    this.httpService.getImage(this.userData.email).subscribe(data => {
      this.createImageFromBlob(data);
    }, error => {this.httpService.failure(error);
    });
}

selectUser() {
    this.messageservice.openConversation(this.userData.nick);
}

}
