import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AppNotification } from 'app/modules/model/app-notification';
import { NotificationService } from 'app/modules/service/notification.service';
import { UserService } from 'app/modules/service/user.service';
import { ConfirmDialogNotificationComponent } from '../confirm-dialog-notification/confirm-dialog-notification.component';
import { AddNotificationComponent } from '../add-notification/add-notification.component';
import { NotificationDetailsComponent } from '../notification-details/notification-details.component';
import { NotificationsService } from 'app/layout/common/notifications/notifications.service';


@Component({
  selector: 'app-list-notifications',
  templateUrl: './list-notifications.component.html',
  styleUrls: ['./list-notifications.component.scss']
})
export class ListNotificationsComponent implements OnInit {


  afterFilter:any
  searchByName:any = ''
  displayedColumns = ['icon', 'title','status','delete','details' ];
  dataSource = new MatTableDataSource<AppNotification>([]);

  notifications:any ;

@ViewChild(MatPaginator) paginator: MatPaginator;
constructor( 
  private notificationService :NotificationService,  private userService :UserService ,  private notiService :NotificationsService,

  private snackBar:MatSnackBar,
  private matDialog: MatDialog,) { }


  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getnotifications() ;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  filterArray() {
    this.dataSource.data =this.notifications.filter(
     ( res:any) =>
         res.title
         
          .toString()
          .toLocaleLowerCase()
          .includes(this.searchByName.trim().toLowerCase())
          

    );
}

getnotifications(){
  this.notificationService.getNotifications().subscribe({

    next :(res:any)=>{
      this.dataSource.data =this.notifications=res.reverse();
      this.notiService.getAll();
    console.log(res +"notifications")
   
    }
    
  })

}




openConfirmationDialog(id : any): void {
  const dialogRef = this.matDialog.open(ConfirmDialogNotificationComponent, {
    width: '250px',
    data: id
  });

  dialogRef.afterClosed().subscribe({
    next :(res:any)=>{
      this.getnotifications();
      this.dataSource.data
    },
    error: (err:any)=>{

    }
  })
   
}

openAddNotification( ): void {
  const dialogRef = this.matDialog.open(AddNotificationComponent, {
   autoFocus: true,
   maxHeight: 'auto',
   maxWidth: 'auto'
 })

 dialogRef.afterClosed().subscribe({
   next :(res:any)=>{
    this.getnotifications();
    this.dataSource.data
   },
   error: (err:any)=>{

   }
 })
}

openNotificationDetails( objet:any): void {
 const dialogRef = this.matDialog.open(NotificationDetailsComponent, {
  autoFocus: true,
  height: '500px',
  width: '500px',
  data: objet
});
dialogRef.afterClosed().subscribe({
 next :(res:any)=>{
  this.getnotifications();
  this.dataSource.data
 },
 error: (err:any)=>{

 }
})
}



}