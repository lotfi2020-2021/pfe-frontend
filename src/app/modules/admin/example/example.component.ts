import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WEBSOCKET_ENDPOINT, WEBSOCKET_NOTIFY_TOPIC } from 'app/modules/constants/base-url.constants';
import { AppNotification } from 'app/modules/model/app-notification';
import { AuthService } from 'app/modules/service/auth.service';
import { NotificationService } from 'app/modules/service/notification.service';
import { WebsocketService } from 'app/modules/service/websocket.service';
import { NgxNotificationDirection, NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';





  
@Component({
    selector     : 'example',
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ExampleComponent  {
   





 
}