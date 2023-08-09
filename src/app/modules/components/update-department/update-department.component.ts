import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Department } from 'app/modules/model/department';
import { AuthService } from 'app/modules/service/auth.service';
import { DepartmentService } from 'app/modules/service/department.service';
import { UserService } from 'app/modules/service/user.service';
import { ToastrService } from 'ngx-toastr';

import { Observable, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';


@Component({
  selector: 'app-update-department',
  templateUrl: './update-department.component.html',
  styleUrls: ['./update-department.component.css']
})
export class UpdateDepartmentComponent implements OnInit {
  afterFilter:any
  searchByemail :any =''
  userId: any;
  emailCtrl = new FormControl('');
  filteredEmails: any;
  emails: string[] = [];
  allEmails: string[] = [];
  users: string[] = []
  department: Department = new Department() ;

  departmentFormGroup: FormGroup;
    constructor( private formBuilder: FormBuilder,private dialogRef: MatDialogRef<UpdateDepartmentComponent> ,@Inject(MAT_DIALOG_DATA) public id: any,
         private departmentService:DepartmentService ,private authService :AuthService , private toastr :ToastrService,
         private snackBar :MatSnackBar, private userService :UserService) { this.filteredEmails = this.emailCtrl.valueChanges.pipe(
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
        );}
    
      get name() { return this.departmentFormGroup.get('name') }


  ngOnInit(): void {
    console.log(this.id +"id")
    

    this.afterFilter =  this.filteredEmails = this.emailCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        return this.filterUsers(value as string);
      }),
    );
    this.getDepartmentId(this.id) 
    
    this.departmentFormGroup = this.formBuilder.group({
      name: [this.department?.name, Validators.required],
      email: [this.department?.email, [Validators.required, Validators.email]],
      responsableDepartment: [this.department?.responsableDepartment, [Validators.required, Validators.email]],
      telephone: [this.department?.telephone, [Validators.required,Validators.maxLength(8),Validators.minLength(8)]],
      description: [this.department?.description, Validators.required]
		});

    this.userId = this.authService.getAuthUserId() 

  }
  closeupdateroom(): void {
    this.dialogRef.close();
    
  }

getDepartmentId( id :any){

  this.departmentService.getDepartmentById(id).subscribe({

    next:(res:any)=>{
      console.log(res);
    this.department=res
     
      this.departmentFormGroup.get('email').setValue(this.department.email)
      this.departmentFormGroup.get('telephone').setValue(this.department.telephone)
      this.departmentFormGroup.get('name').setValue(this.department.name)
      this.departmentFormGroup.get('responsableDepartment').setValue(this.department.responsableDepartment)
      this.departmentFormGroup.get('description').setValue(this.department.description)
     },
     error:(err:any)=>{

     }


  })
}


filterArray2() {
  this.afterFilter = this.filteredEmails.filter(
   ( res:any) =>
       res.name
       
        .toString()
        .toLocaleLowerCase()
        .includes(this.searchByemail.trim().toLowerCase())
      
  );
}
updateDepartment(){
  const newRoom = this.departmentFormGroup.value;
  this.departmentService.updateDepartment( this.id ,newRoom ).subscribe({
    next:(res:any)=>{
     console.log(res);
     this.departmentFormGroup.reset();
     this.closeupdateroom();
    //  this.snackBar.open('update Department successfully', '', {
    //   duration: 5000,
      
    //   panelClass: 'snackbarstyle-green'
    //   });
    this.toastr.success('update Department successfully','Success',  {
      timeOut: 7000});
    
    }
    }
  
  )}
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


  
  



}
