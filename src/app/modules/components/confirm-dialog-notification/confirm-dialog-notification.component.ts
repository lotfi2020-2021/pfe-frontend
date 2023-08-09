import { Component, Inject, Output, EventEmitter,OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from 'app/modules/service/notification.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-dialog-notification',
  templateUrl: './confirm-dialog-notification.component.html',
  styleUrls: ['./confirm-dialog-notification.component.scss']
})
export class ConfirmDialogNotificationComponent implements OnInit {
  @Output()
  public confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any,
    private notificationService :NotificationService,private snackBar: MatSnackBar ,private toastr :ToastrService
    
  ) { }
  ngOnInit(): void {
   console.log(this.id)
  }

  onNoClick(): void {
    
    this.dialogRef.close();
  }

  onYesClick(): void {
   
    this.notificationService.deleteNotification(this.id).subscribe({
      next :(res: any)=>{
        this.toastr.success('delete successfully', 'Success', {
          timeOut: 7000
        })
    
      },
      error:(err : any)=>{
        // this.snackBar.open('failed', '', {
        //   duration: 5000,
          
        //   panelClass: 'snackbarstyle-rouge'
        //   });
        this.toastr.error('failed', 'ERROR', {
          timeOut: 7000
        })
      }
    })
    this.dialogRef.close();
  }
}
