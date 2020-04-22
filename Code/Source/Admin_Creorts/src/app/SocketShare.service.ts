'use strict';
import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';
import {ConstantService} from './constant.service';

@Injectable()
export class SocketSharedService {
  socket;
  myId: any;

  constructor(public constService: ConstantService) {
    this.myId = localStorage.getItem('id');
    this.socket = io.connect(this.constService.Socket_Url);
    this.socket.on('connect', function () {
      console.log('connected');
    });

    this.socket.on('disconnect', function () {
      console.log('disconnected');
    });

    this.socket.on('error', function (e) {
      console.log('System', e ? e : 'A unknown error occurred');
    });

  }


  userInfo(userId: any) {
    var data: any = {
      userId: ''
    };
    data.userId = userId;
    this.socket.emit('restaurantInfo', data);
  }

  getMessages(Uid: any) {
    let observable = new Observable(observer => {
      this.socket.on('message' + Uid, (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  updateCountUnReadMessage(user_id, seller_id) {
    this.socket.emit('updateSeller', {
      receiver_id: seller_id,
      sender_id: user_id
    });
  }

  getCountNotification() {
    let observable = new Observable(observer => {
      this.socket.on('updatedCount' + this.myId, (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  getUserNotification() {
   // alert(" 4. soket share get user  notification")
    let observable = new Observable(observer => {
      this.socket.on('notify' + this.myId, (data) => {
        observer.next(data);
        //console.log("data getUserNotification "+JSON.stringify(data));
      });
    })
    return observable;
  }

  getOrderNotification() {
  //alert("order notificatio socket share service ")
    let observable = new Observable(observer => {
      this.socket.on('notify', (data) => {
        console.log(data)
        observer.next(data);
      });
    })
    return observable;
  }
}
