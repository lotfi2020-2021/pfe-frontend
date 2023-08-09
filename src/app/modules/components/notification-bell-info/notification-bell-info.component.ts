import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'app/modules/service/notification.service';

@Component({
  selector: 'app-notification-bell-info',
  templateUrl: './notification-bell-info.component.html',
  styleUrls: ['./notification-bell-info.component.scss'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class NotificationBellInfoComponent implements OnInit {
  receivers:any
  notification:any ;
  showMembers: boolean = false;
  constructor( private notificationService :NotificationService ,@Inject(MAT_DIALOG_DATA) public id: any) { }

  ngOnInit(): void {
    this.getUserNotificationById(this.id);
  
  }


  getUserNotificationById(id :any){

  this.notificationService.getUserNotificationById(id).subscribe({

next:(res:any)=>{

  this.notification =res
  console.log("group"+res) ;
}
  })
  
}



}
