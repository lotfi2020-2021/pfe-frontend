import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild   } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { AuthService } from 'app/modules/service/auth.service';
import { NotificationService } from 'app/modules/service/notification.service';
import { UserService } from 'app/modules/service/user.service';

import { Observable, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-notification',
  templateUrl: './add-notification.component.html',
  styleUrls: ['./add-notification.component.scss']
})
export class AddNotificationComponent implements OnInit   {

  separatorKeysCodes = [ENTER, COMMA];
  title: any;
 content:any;
 users:any=[]
 type: string = "WARN";
afterFilter:any
afterFilter2:any
searchByemail :any =''
emailCtrl = new FormControl();
filteredEmails: any
emails: string[] = [];
allEmails: string[] = [];
hide:any
authUser:any

@ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.authUser =  this.authService.getAuthUserFromCache()
    this.getUsers() ;
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
    public dialogRef: MatDialogRef<AddNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private userService :UserService, private notificationService :NotificationService,
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




  onShowAllEmailsChange() {
    this.hide = !this.hide;
    
    if (this.hide) {
      this.afterFilter2.subscribe(emails => {
        for (let email of emails.filter((email)=>(email!== this.authUser.email))) {
          this.emails.push(email);
        }
      });
    } else {
      this.emails = [];
    }
  }
  

  
  onSave( ): void {
    const notificationData = {
      title: this.title,

      content: this.content,
      type : this.type ,
      emailList: this.emails,
     
  
    };
    console.log(notificationData)
   this.notificationService.sendNotification(this.authUser.id,notificationData.title,notificationData.content,notificationData.type,notificationData.emailList).subscribe({
    next :(res:any)=>{
  this.dialogRef.close(notificationData);
 }
   })
  }
  

  onCancel(): void {
    this.dialogRef.close();
  }

getUsers(){
this.userService.getUsers().subscribe({

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