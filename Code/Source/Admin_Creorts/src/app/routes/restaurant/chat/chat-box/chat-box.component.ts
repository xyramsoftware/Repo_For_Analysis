import {Component, ViewEncapsulation, OnInit, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ChatService} from '../chat.service';
import {Observable} from 'rxjs/Observable';
import {NgForm} from '@angular/forms';
import {userlist, chatData, showChat} from '../chat';
import {ChatComponent} from '../chat.component';
import {Store} from '@ngrx/store';
import {SocketSharedService} from '../../../../SocketShare.service';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
  providers: [ChatService, ChatComponent]
})
export class ChatBoxComponent implements OnInit {
  
  chatMessage:any
  username:any
  

  constructor(public el: ElementRef,
              private _chatService: ChatService,
              private routes: ActivatedRoute,
              private router: Router,
              public Chat: ChatComponent,
              public sharedService: SocketSharedService,
              public storeData: Store<showChat>) {

    


  }

  
 
  

  ngOnInit() {
   
  }

  
}
