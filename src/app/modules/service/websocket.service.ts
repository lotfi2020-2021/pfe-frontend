import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { WEBSOCKET_ENDPOINT, WEBSOCKET_MESSAGE_TOPIC, WEBSOCKET_NOTIFY_TOPIC } from '../constants/base-url.constants';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
 
    stompClient: any;
  
    constructor(private notificationService: NotificationService) { }
    connect(): void {
      console.log('webSocket Connection');
      const ws = new SockJS(WEBSOCKET_ENDPOINT);
      this.stompClient = Stomp.over(ws);
      const _this = this;
      _this.stompClient.connect({}, function(frame) {
        console.log('Connected');
        _this.subscribeToNotificationTopic();
        _this.subscribeToChatTopic();
      }, _this.errorCallBack.bind(_this));
    }
    
    disconnect(): void {
      if (this.stompClient !== null) {
        this.stompClient.disconnect();
      }
      console.log('Disconnected');
    }
    
    // on error, schedule a reconnection attempt
    errorCallBack(error) {
      console.log('errorCallBack -> ' + error);
      setTimeout(() => {
        this.connect();
      }, 5000);
    }
    
    subscribeToNotificationTopic(): void {
      const _this = this;
      _this.stompClient.subscribe(WEBSOCKET_NOTIFY_TOPIC, function(sdkEvent) {
        console.log('Subscribed to ' + WEBSOCKET_NOTIFY_TOPIC);
        _this.onNotificationReceived(sdkEvent);
      });
    }
    
    subscribeToChatTopic(): void {
      const _this = this;
      _this.stompClient.subscribe(WEBSOCKET_MESSAGE_TOPIC, function(sdkEvent) {
        console.log('Subscribed to ' + WEBSOCKET_MESSAGE_TOPIC);
        _this.onChatReceived(sdkEvent);
      });
    }
    
    onNotificationReceived(message): void {
      console.log('Notification Received from Server :: ' + message);
      const notification = JSON.parse(message.body);
      this.notificationService.notificationMessage.emit(notification);
    }
    
    onChatReceived(message): void {
      console.log('Chat Message Received from Server :: ' + message);
      const chatMessage = JSON.parse(message.body);
      this.notificationService.chatMessage.emit(chatMessage);
    }
  
 
  }