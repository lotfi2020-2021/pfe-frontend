import { Component, Inject, OnInit , ChangeDetectorRef, ChangeDetectionStrategy  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UpdateEventComponent } from '../update-event/update-event.component';
import { GoogleCalenderService } from 'app/modules/service/google-calender.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventDetailsComponent implements OnInit  {
event:any;
start:any;
end:any ;
members:any
showAttendees: boolean = false;
  ngOnInit(): void {
    console.log(this.data.id )
   this.getEventDetails(this.data.id) ;
  

   this.event
  }
  constructor(
    public dialogRef: MatDialogRef<EventDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: any } , private googCalenderService :GoogleCalenderService,private dialog: MatDialog,
    private cdRef :ChangeDetectorRef
 
  ) {}

  onClick(button: 'delete' | 'update') {
    if (button === 'update') {
      const dialogRef = this.dialog.open(UpdateEventComponent, {
        width: '600px',
        data: this.event // pass the current event to the dialog component
      });
  
      dialogRef.afterClosed().subscribe((result:any) => {
       
        this.getEventDetails(this.data.id) ;
        this.getEventDetails(this.data.id) ;
        this.getEventDetails(this.data.id) ;


        
      });
    } else {
      this.dialogRef.close(button);
    }
  }

  // refreshEvent() {
  //   this.googCalenderService.geteventById(this.data.id).subscribe(
  //     (res: any) => {
  //       this.event = res; 
  
  //     },
  //     (error: any) => {

  //     }
  //   );
  // }
  
  

    getEventDetails(id :any){
this.googCalenderService.geteventById(id).subscribe({
  next :(res:any)=>{
  

this.event =res
this.members=res.attendees

this.start= new Date(res.start.dateTime?.value + (60 * 60 * 1000));
this.end = new Date(res.end.dateTime?.value + (60 * 60 * 1000));

console.log(res)
this.cdRef.detectChanges();
this.cdRef.markForCheck();
  }
})

}


}
