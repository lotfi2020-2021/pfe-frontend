import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Inject, OnInit, ViewChild   } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'app/modules/service/user.service';
import { Observable, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';
import { NotificationService } from 'app/modules/service/notification.service';

@Component({
  selector: 'app-update-notification',
  templateUrl: './update-notification.component.html',
  styleUrls: ['./update-notification.component.scss']
})
export class UpdateNotificationComponent implements OnInit {

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
    this.getReceivers();
    this.getNotificationById(this.data.id);
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
    public dialogRef: MatDialogRef<UpdateNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private userService :UserService, private notificationService :NotificationService,

   
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


  getNotificationById(id:any){
    this.notificationService.getNotificationById(id).subscribe({
      next :(res:any)=>{
        this.title =res.title
        this.type =res.type ;
        this.content=res.content
        console.log()
  
        // const notifications = res.notification; // assuming notification is an array
        // for (let i = 0; i < notifications.length; i++) {
        //   const senderId = notifications[i].sender.id;
        //   this.notificationService.getNotificationBySenderIdAndNotificationId(res.id, senderId).subscribe({
        //     next: (res: any) => {
        //       const listEmail = res.map((notification: any) => {
        //         return notification.receiverEmail;
        //       });
  
        //       for (let email of listEmail) {
        //         this.emails.push(email);
        //       }
        //     }
        //   });
        // }
      }
    });
  }

  onShowAllEmailsChange() {
    this.hide = !this.hide;
    
    if (this.hide) {
      this.afterFilter2.subscribe(emails => {
        for (let email of emails) {
          this.emails.push(email);
        }
      });
    } else {
      this.emails = [];
    }
  }

  getReceivers(){
    this.data.receivers.forEach(element => {
      
        this.emails.push(element.receiverEmail);
      
    });
  }

  
  onSave( ): void {
    const notificationData = {
      title: this.title,
      content: this.content,
      type : this.type ,
      emailList: this.emails,
     

    };
    console.log(notificationData)
   this.notificationService.updateNotification(this.data.id,notificationData.title,notificationData.content,notificationData.type,notificationData.emailList).subscribe({
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