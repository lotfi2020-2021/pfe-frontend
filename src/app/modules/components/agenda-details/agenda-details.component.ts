import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GoogleCalenderService } from 'app/modules/service/google-calender.service';


@Component({
  selector: 'app-agenda-details',
  templateUrl: './agenda-details.component.html',
  styleUrls: ['./agenda-details.component.css'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class AgendaDetailsComponent implements OnInit {
agenda:any ;
  constructor(private googleCalenderService :GoogleCalenderService,public dialogRef: MatDialogRef<AgendaDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any,) { }

  ngOnInit(): void {
    this.detailsCalender();
    console.log(this.id +"id")
  }

detailsCalender(){
 this.googleCalenderService.getCalenderById(this.id).subscribe({
next:(res:any)=>{
this.agenda=res ;
console.log(res +"calender")
}

 })

}

}
