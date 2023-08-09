import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppNotification } from 'app/modules/model/app-notification';
import { NotificationService } from './modules/service/notification.service';
import { NgxNotificationDirection, NgxNotificationMsgComponent, NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { WebsocketService } from './modules/service/websocket.service';
import { AuthService } from './core/auth/auth.service';

@Component({
    selector   : 'app-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  user:any
  counter: number;
  

  constructor( private authService :AuthService,
              private readonly ngxNotificationMsgService: NgxNotificationMsgService,
              private notificationService: NotificationService,
              private websocketService: WebsocketService) {
              
  
  }

  ngOnInit() {
    // this.connect();
    // this.user = this.authService.getAuthUserFromCache()
    // this.counter = 0;
  }

//   connect(): void {
//     this.websocketService.connect();
//     this.notificationService.notificationMessage.subscribe((data) => {
//       console.log('message', data);
//       this.notify(data);
//     });
//   }

//   disconnect(): void {
//     this.websocketService.disconnect();
//   }



//   notify(message: any): void {
//     this.counter++;

//    this.notificationService.getNotificationBySenderIdAndNotificationId(message.id,message.sender.id).subscribe({
//     next:(res:any)=>{
//     console.log(res)  
// res.forEach(element => {

//   console.log(element+"testtest")
//   if(element.receiverEmail === this.user.email){

//     if(message.type ==='INFO'){
//     this.ngxNotificationMsgService.open({
//       status: NgxNotificationStatusMsg.INFO,
//       direction: NgxNotificationDirection.BOTTOM_RIGHT,
//       header: message.title,
//       messages: [message.content],
//      closeable:true,
//      displayProgressBar:true,
//      delay :7000,
//      displayIcon:true,
   
//   }
//     )
//     }

// if(message.type ==='WARN'){
//   this.ngxNotificationMsgService.open({
//       status: NgxNotificationStatusMsg.FAILURE,
//       direction: NgxNotificationDirection.BOTTOM_RIGHT,
//       header: message.title,
//       messages: [message.content],
//      closeable:true,
//      displayProgressBar:true,
//      delay :7000,
//      displayIcon:true,
   
//   });
// }

//   }
  
// });
       
   
//   }})}
  




      
    
}
