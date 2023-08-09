import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

import { ConfirmDialogGroupComponent } from '../confirm-dialog-group/confirm-dialog-group.component';
import { Observable, debounceTime, distinctUntilChanged, map, startWith, switchMap } from 'rxjs';

import { GroupDetailsComponent } from '../group-details/group-details.component';
import { animate, style, transition, trigger } from '@angular/animations';
import { UserService } from 'app/modules/service/user.service';
import { GroupService } from 'app/modules/service/group.service';
import { DepartmentService } from 'app/modules/service/department.service';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css'],
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('1000ms', style({ opacity: 0 })),
      ]),
    ]),
  ]
})
export class DepartmentDetailsComponent implements OnInit {
  departmentId:any
  department:any;
  groups:any 
  showAddGroup:any
  afterFilter:any
  afterFilter2:any
  searchByName:any = ''
  searchByemail :any =''
  emailCtrl = new FormControl();
  filteredEmails: any
  emails: string[] = [];
  allEmails: string[] = [];
  users: string[] = [];
  newGroup :any ;
  constructor( private departmentService: DepartmentService,
    private route: ActivatedRoute,  private groupService :GroupService,public matDialog: MatDialog ,private snackBar:MatSnackBar,
   private router :Router  , private userService :UserService  ) { 
   
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

  ngOnInit(): void {
    this.afterFilter  =  this.groups;
    this.afterFilter2 =  this.filteredEmails = this.emailCtrl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => {
        return this.filterUsers(value as string);
      }),
    );
    


    this.departmentId = this.route.snapshot.params['id'];
    this.getDepartmentById(this.departmentId);
    this.showGroups(this.departmentId)

  }
  displayFn(email: string): string {
    return email ? email : '';
  }
  createForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    responsableGroup: new FormControl('', Validators.required)
  });

  showGroups(departmentId: any): void {
    this.groupService.getGroupstByDepartmentId(departmentId).subscribe({
      next: (res: any) => {
        this.afterFilter=  this.groups=res
        console.log(this.groups);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  filterUsers(email: string): Observable<string[]> {
    return this.userService.getUsers().pipe(
      map(users => users.filter(user => user.email.toLowerCase().startsWith(email.toLowerCase()))),
      map(users => users.map(user => user.email)),
    );
  }


  
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allEmails.filter(email => email.toLowerCase().startsWith(filterValue));
  }
  
  getDepartmentById(id:any){

    this.departmentService.getDepartmentById(id).subscribe({
      next: (res: any) => {
        this.department=res
        console.log(this.department);
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }




  openConfirmationDialog(id : any): void {
    const dialogRef = this.matDialog.open(ConfirmDialogGroupComponent, {
      width: '250px',
      data: id
    });

    dialogRef.afterClosed().subscribe({
      next :(res:any)=>{
        this.showGroups(this.departmentId);
        this.afterFilter; 
      },
      error: (err:any)=>{

      }
      
    })
     
  }
 
  openGroupDetail( id:any): void {
    const dialogRef = this.matDialog.open(GroupDetailsComponent, {
     autoFocus: true,
     height: '500px',
     width: '500px',
     data: id
   });
  }

  onCreateGroup() {
    
    this.newGroup =  this.createForm.value ;
  
    this.groupService.createGroup(this.newGroup, this.departmentId).subscribe({

      next :(res:any)=>{
      
        this.snackBar.open('add successfully', '', {
          duration: 5000,
          
          panelClass: 'snackbarstyle-green'
          });
          this.createForm.reset();
          this.showAddGroup = false;
          this.showGroups(this.departmentId);
          this.afterFilter; 
         
      } ,
      error :(err:any)=>{
        this.snackBar.open('name group exist', '', {
          duration: 5000,
          
          panelClass: 'snackbarstyle-rouge'
          });
      }
     

    })
   
  }


  filterArray() {
    this.afterFilter = this.groups.filter(
     ( res:any) =>
         res.name
         
          .toString()
          .toLocaleLowerCase()
          .includes(this.searchByName.trim().toLowerCase())
        
    );
}


filterArray2() {
  if (Array.isArray(this.filteredEmails)) {
    this.afterFilter = this.filteredEmails.filter((res: any) =>
      res.name
        .toString()
        .toLocaleLowerCase()
        .includes(this.searchByemail.trim().toLowerCase())
    );
  }
}



  }


