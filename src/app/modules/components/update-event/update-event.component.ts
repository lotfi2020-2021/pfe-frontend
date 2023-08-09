import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { GoogleCalenderService } from 'app/modules/service/google-calender.service';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/modules/service/user.service';


@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {

  separatorKeysCodes = [ENTER, COMMA];
  summary: any;
 description:any;
 startDateTime:any;
 endDateTime:any;
 attendees:any;
 isAddVideoConference:boolean=false ;
 colorId:any ;
  guestsCanModify:boolean=false;
  attendeesOmitted :boolean=false ;
  guestsCanInviteOthers:boolean=false;
  guestsCanSeeOtherGuests:boolean=false;
 visibility: string = "public";
 users:any=[]
 colors :any ;
 color:any
 selectedColor: any;

entrepriseId :any
afterFilter:any
afterFilter2:any
searchByemail :any =''
emailCtrl = new FormControl();
filteredEmails: any
emails: string[] = [];
allEmails: string[] = [];
event:any
@ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.getColors() ;
console.log("data"+this.data.id)
this.getEventById(this.data.id);
   this.afterFilter2 =  this.filteredEmails = this.emailCtrl.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    distinctUntilChanged(),
    switchMap(value => {
      return this.filterUsers(value as string);
    }),
  );
  
  }



  constructor(
    public dialogRef: MatDialogRef<UpdateEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private googleCalenderService :GoogleCalenderService , private userService :UserService,
    private authService :AuthService 
  ) {
    this.filteredEmails = this.emailCtrl.valueChanges.pipe(
      startWith(null),
      switchMap((email: string | null) => {
        if (email) {
          return this.filterUsers(email);
        } else {
          return this.userService.getUsers().pipe(map(users => users.map(user => user.email)));
        }
      }),
      map((filteredEmails: string[]) => {
        this.allEmails  =filteredEmails;
        return this._filter(this.emailCtrl.value);
      }),
    );
  }


  getColors(){
this.googleCalenderService.getColors().subscribe({
  next :(res:any)=>{
    this.colors=res ;
    console.log( this.colors)

  }
})


  }
  onUpdate(): void {
    const eventData = {
      summary: this.summary,
      colorId: this.selectedColor,
      description: this.description,
      visibility: this.visibility,
      attendees: this.emails,
  
      guestsCanModify: this.guestsCanModify,
      guestsCanInviteOthers: this.guestsCanInviteOthers,
      isAddVideoConference: this.isAddVideoConference,
      attendeesOmitted: this. attendeesOmitted ,
      guestsCanSeeOtherGuests: this.guestsCanSeeOtherGuests,
       startDateTime : this.startDateTime,
       endDateTime : this.endDateTime,
    };
   this.googleCalenderService.updateEvent(this.data.id,eventData).subscribe({
   next :(res:any)=>{

   }
   })
   this.dialogRef.close();
  }
  

  onCancel(): void {
    this.dialogRef.close();
  }

getUsers(id:any){
this.userService.getusersByEntreprise(id).subscribe({

  next :(res:any)=>{
 this.users =res
 
  }
})

}

getEventById(id:any){
this.googleCalenderService.geteventBaseById(id).subscribe({
next :(res:any)=>{
  this.event =res
  this.selectedColor =res.colorId 
   this.summary=res.summary
 this.description=res.description
 this.visibility=res.visibility
 this.emails =res.attendees
  this.guestsCanModify =res.guestsCanModify
   this.guestsCanInviteOthers=res.guestsCanInviteOthers
   this.isAddVideoConference=res.isAddVideoConference
  this. attendeesOmitted =res.attendeesOmitted
 this.guestsCanSeeOtherGuests=res.guestsCanSeeOtherGuests
    this.endDateTime =res.endDateTime
   this.startDateTime=res.startDateTime

}
})

}


filterUsers(email: string): Observable<string[]> {
  return this.userService.getUsers().pipe(
    map(users => users.filter(user => user.email?.toLowerCase().includes(email?.toLowerCase()))),
    map(users => users.map(user => user.email)),
  );
}

add(event: MatChipInputEvent): void {
  const value = (event.value || '').trim();

  // Add our email
  if (value) {
    this.emails.push(value);
  }

  // Clear the input value
  event.chipInput!.clear();

  this.emailCtrl.setValue(null);
}

remove(email: string): void {
  const index = this.emails.indexOf(email);

  if (index >= 0) {
    this.emails.splice(index, 1);
  }
}

displayFn(email: string): string {
  return email ? email : '';
}

selected(event: MatAutocompleteSelectedEvent): void {
  this.emails.push(event.option.viewValue);
  this.emailInput.nativeElement.value = '';
  this.emailCtrl.setValue(null);
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.allEmails.filter(email => email.toLowerCase().includes(filterValue));
}

filterArray2() {
  if (Array.isArray(this.filteredEmails)) {
    this.afterFilter = this.filteredEmails.filter(
      (res: any) =>
        res?.email
          .toString()
          .toLocaleLowerCase()
          .includes(this.searchByemail?.trim().toLowerCase())
    );
  }
}


}
