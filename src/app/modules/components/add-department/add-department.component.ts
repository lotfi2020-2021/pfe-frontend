import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'app/modules/service/auth.service';
import { DepartmentService } from 'app/modules/service/department.service';

import { UserService } from 'app/modules/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';



@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {
  emailCtrl = new FormControl('');
  filteredEmails: any;
  emails: string[] = [];
  allEmails: string[] = [];
  users: string[] = [];
  userId: any;
  afterFilter:any
  searchByemail :any =''
  departmentFormGroup: FormGroup;
  constructor( private formBuilder: FormBuilder,private dialogRef: MatDialogRef<AddDepartmentComponent> ,
     private departmentService:DepartmentService ,private authService :AuthService,private snackBar: MatSnackBar,
      private router:Router,private userService:UserService , private  toastr : ToastrService ) { 
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
          this.allEmails = filteredEmails;
          return this._filter(this.emailCtrl.value);
        }),
      );
     }

  get name() { return this.departmentFormGroup.get('name') }
  get email() { return this.departmentFormGroup.get('email') }
  get responsableDepartment() { return this.departmentFormGroup.get('responsableDepartment') }
  get telephone() { return this.departmentFormGroup.get('telephone') }
  get description() { return this.departmentFormGroup.get('description') }


  ngOnInit(): void {
    this.afterFilter =  this.filteredEmails = this.emailCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        return this.filterUsers(value as string);
      }),
    );

    this.departmentFormGroup = this.formBuilder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        responsableDepartment: ['', [Validators.required, Validators.email]],
        telephone: ['', [Validators.required,Validators.maxLength(8),Validators.minLength(8)]],
        description: ['', Validators.required]
		});


    
    this.userId = this.authService.getAuthUserId() 

  }
  closeAddDepartment(): void {
    this.dialogRef.close();
    
  }


filterUsers(email: string): Observable<string[]> {
  return this.userService.getUsers().pipe(
    map(users => users.filter(user => user.email.toLowerCase().includes(email.toLowerCase()))),
    map(users => users.map(user => user.email)),
  );
}

private _filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.allEmails.filter(email => email.toLowerCase().includes(filterValue));
}


addDepartment(){
  const newDepartment = this.departmentFormGroup.value;
  this.departmentService.createDepartment(newDepartment ,this.userId  ).subscribe({
    next:(res:any)=>{
     console.log(res);
     this.departmentFormGroup.reset();
     this.closeAddDepartment();
    //  this.snackBar.open('Add room successfully', '', {
    //   duration: 5000,
      
    //   panelClass: 'snackbarstyle-green'
    //   });
    this.toastr.success('added sucesfully','SUCCESS',  {
      timeOut: 7000});
    }
    }
  
  )}


  
filterArray2() {
  this.afterFilter = this.filteredEmails.filter(
   ( res:any) =>
       res.name
       
        .toString()
        .toLocaleLowerCase()
        .includes(this.searchByemail.trim().toLowerCase())
      
  );
}

}


