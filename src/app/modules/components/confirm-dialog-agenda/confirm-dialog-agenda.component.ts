import { Component, Inject, Output, EventEmitter,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GoogleCalenderService } from 'app/modules/service/google-calender.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-comfirm-dialog-agenda',
  templateUrl: './confirm-dialog-agenda.component.html',
  styleUrls: ['./confirm-dialog-agenda.component.css']
})
export class ComfirmDialogAgendaComponent implements OnInit {

  @Output()
  public confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<ComfirmDialogAgendaComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any,
    private calenderService:GoogleCalenderService,private snackBar: MatSnackBar, private toastr :ToastrService,
    
  ) { }
  ngOnInit(): void {
   console.log(this.id)
  }

  onNoClick(): void {
    
    this.dialogRef.close();
  }

  onYesClick(): void {
   
    this.calenderService.deleteCalender(this.id).subscribe({
      next :(res: any)=>{
        // this.snackBar.open('delete successfully', '', {
        //   duration: 5000,
          
        //   panelClass: 'snackbarstyle-green'
        //   });
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
