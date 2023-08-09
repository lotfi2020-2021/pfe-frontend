import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { AddDepartmentComponent } from '../add-department/add-department.component';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateDepartmentComponent } from '../update-department/update-department.component';
import { ConfirmDialogDepartmentComponent } from '../confirm-dialog-department/confirm-dialog-department.component';
import { DepartmentService } from 'app/modules/service/department.service';
import { AuthService } from 'app/modules/service/auth.service';

@Component({
  selector: 'app-list-department',
  templateUrl: './list-department.component.html',
  styleUrls: ['./list-department.component.css']
})
export class ListDepartmentComponent implements OnInit {


  dialogRef: MatDialogRef<AddDepartmentComponent>;
  departments: DepartmentService[];
  userId:any
  afterFilter:any
  searchByName:any = ''
  constructor(private departmentService: DepartmentService , private matDialog :MatDialog ,
    private authService :AuthService, private router : Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
   this.userId= this.authService.getAuthUserId();
    this.afterFilter  =  this.getDepartments();
    
  }

  getDepartments(): void {
    this.departmentService.getDepartmentByEntrepriseId(this.userId)
      .subscribe({
        next:(res:any)=>{
          console.log(res);
       this.afterFilter=   this.departments=res ;
       
  console.log(res)
        ;
   } })
      
  }


  openAddDepartment( ): void {
     const dialogRef = this.matDialog.open(AddDepartmentComponent, {
      autoFocus: true,
      maxHeight: 'auto',
      maxWidth: 'auto'
    })

    dialogRef.afterClosed().subscribe({
      next :(res:any)=>{
        this.getDepartments();
      },
      error: (err:any)=>{

      }
    })
  }

 openUpdateDepartment( id:any): void {
    const dialogRef = this.matDialog.open(UpdateDepartmentComponent, {
     autoFocus: true,
     maxHeight: '900px',
     maxWidth: '1200px',
     data: id
   });
   dialogRef.afterClosed().subscribe({
    next :(res:any)=>{
      this.getDepartments();
    },
    error: (err:any)=>{

    }
  })
 }
  closeAddDepartment(): void {
  
    this.dialogRef.close();
  }

    // showdetails(id:any){
    //   this.router.navigate( ['/home/room-details', id])
    // }

    
    openConfirmationDialog(id : any): void {
      const dialogRef = this.matDialog.open(ConfirmDialogDepartmentComponent, {
        width: '250px',
        data: id
      });
  
      dialogRef.afterClosed().subscribe({
        next :(res:any)=>{
          this.getDepartments();
        },
        error: (err:any)=>{

        }
      })
       
    }



    filterArray() {
      this.afterFilter = this.departments.filter(
       ( res:any) =>
           res.name
           
            .toString()
            .toLocaleLowerCase()
            .includes(this.searchByName.trim().toLowerCase())
            

           


      );
}

}