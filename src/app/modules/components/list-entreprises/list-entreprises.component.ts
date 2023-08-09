
import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import {MatPaginator} from '@angular/material/paginator';

import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxNotificationDirection, NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { ConfirmDialogUserComponent } from '../confirm-dialog-user/confirm-dialog-user.component';
import { UserService } from 'app/modules/service/user.service';
import { AuthService } from 'app/modules/service/auth.service';
import { User } from 'app/modules/model/user';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-entreprises.component.html',
  styleUrls: ['./list-entreprises.component.css']
})
export class ListEntreprisesComponent implements OnInit ,AfterViewInit{
  displayedColumns = ['firstName', 'lastName', 'email','role','status','delete','details'];
  dataSource = new MatTableDataSource<any>([]);
  users:any ;
  authUser:any;

  
  searchByName:any = ''
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(  private userService :UserService,
    private authService: AuthService,
  
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getEntreprises();

  this.authUser= this.authService.getAuthUserFromCache();

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

bloquer(userid:any){
  this.userService.bloquerOrDebloquer(userid).subscribe(data  => {
         
    this.getEntreprises() ;
       
   })
  
}

deleteUser(userid:any){
  this.userService.deleteUserById(userid).subscribe(data  => {
         
 this.getEntreprises()
       
   })
  
}


getEntreprises(){
  this.userService.getEntreprise().subscribe(data  => {
    this.users = this.dataSource.data =data.filter(user => user.id !== this.authUser.id);
   console.log('users:',this.users)
   data.forEach( (el :any ) => {
      console.log('el',this.users)
  })
   })

  }

    filterArray() {
     this.dataSource.data = this.users.filter(
       ( _:any) =>
          _.email
            .toString()
            .toLocaleLowerCase()
            .includes(this.searchByName.trim().toLowerCase())
            
      );
    }



 



          openUserDetails( id : any): void {
            this.matDialog.open(UserDetailsComponent, {
              data:id,
            
              height: 'auto',
              width: 'auto'
            });
          }


          openConfirmationDialog(id : any): void {
            const dialogRef = this.matDialog.open(ConfirmDialogUserComponent, {
              width: '250px',
              data: id
            });
        
            dialogRef.afterClosed().subscribe({
              next :(res:any)=>{
                this.getEntreprises();
              },
              error: (err:any)=>{
      
              }
            })
             
          }



}
