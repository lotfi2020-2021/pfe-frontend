import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { AuthService } from 'app/modules/service/auth.service';
import { GoogleCalenderService } from 'app/modules/service/google-calender.service';
import { Observable, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';
import { UserService } from 'app/modules/service/user.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  separatorKeysCodes = [ENTER, COMMA];
  summary: any;
 description:any;
 startDateTime:any;
 endDateTime:any;
 attendees:any;
 isAddVideoConference:boolean=false ;
 colorId:any ;
  guestsCanModify:boolean=false;
  attendeesOmitted :boolean=true ;
  guestsCanInviteOthers:boolean=true;
  guestsCanSeeOtherGuests:boolean=true;
 visibility: string = "public";
 users:any=[]
 colors :any ;
 selectedColor: any;
 visibilities:{'public','private'}
entrepriseId :any
afterFilter:any
afterFilter2:any
searchByemail :any =''
emailCtrl = new FormControl();
filteredEmails: any
emails: string[] = [];
allEmails: string[] = [];

@ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.getColors() ;
this.entrepriseId = this.authService.getAuthUserId();
console.log(this.entrepriseId)
   // this.getUsers(this.entrepriseId) ;
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
    public dialogRef: MatDialogRef<AddEventComponent>,
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
  onSave(): void {
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
      guestsCanSeeOtherGuests: this.guestsCanSeeOtherGuests
    };
    console.log(eventData)
   this.dialogRef.close(eventData);
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
