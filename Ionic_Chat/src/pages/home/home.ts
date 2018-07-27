import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { ChatRoomPage } from '../chat-room/chat-room';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  nickname= '';
  constructor(public navCtrl: NavController, private socket: Socket) {}

    joinChat(){
        this.socket.connect();
        this.socket.emit('set-nickname' , this.nickname );
        this.navCtrl.push('ChatRoomPage' , {nickname: this.nickname})
    }

    joinChatAsAnonymous(){
      this.socket.connect();
      this.socket.emit('set-nickname' , 'anonymous' );
      this.navCtrl.push('ChatRoomPage' , {nickname: 'anonymous'})
    }
}