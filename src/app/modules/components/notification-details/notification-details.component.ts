import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { NotificationService } from 'app/modules/service/notification.service';
import { UserService } from 'app/modules/service/user.service';
import { UpdateNotificationComponent } from '../update-notification/update-notification.component';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-notification-details',
  templateUrl: './notification-details.component.html',
  styleUrls: ['./notification-details.component.scss'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class NotificationDetailsComponent {

  host=environment.apiUrl;
  receivers:any
  notification:any ;
  showMembers: boolean = false;
  constructor( private userService: UserService ,
    private notificationService :NotificationService ,
    @Inject(MAT_DIALOG_DATA) public objet: any ,private matDialog: MatDialog,) { }

  ngOnInit(): void {
    this.getNotificationById(this.objet.id);
    this.getReceiversBynotification();
  }


  getNotificationById(id :any){

  this.notificationService.getNotificationById(id).subscribe({

next:(res:any)=>{

  this.notification =res
  console.log("group"+res) ;
}
  })
  
}


getReceiversBynotification(){

  this.notificationService.getNotificationBySenderIdAndNotificationId(this.objet.id ,this.objet.sender.id).subscribe({

next:(res:any)=>{

  this.receivers =res
}
  })
  
}




openUpdateNotification( id :any ): void {
  const dialogRef = this.matDialog.open(UpdateNotificationComponent, {
   autoFocus: true,
   maxHeight: 'auto',
   maxWidth: 'auto',
   data :{ id: id, receivers: this.receivers }
 })

 dialogRef.afterClosed().subscribe({
   next :(res:any)=>{
    this.getNotificationById(this.objet.id);
    this.getReceiversBynotification();
   },
   error: (err:any)=>{

   }
 })
}


}