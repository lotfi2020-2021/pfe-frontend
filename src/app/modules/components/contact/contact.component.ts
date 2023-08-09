import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ContactService } from './contact.service';
import { AuthService } from 'app/core/auth/auth.service';
import { environment } from 'environments/environment.development';
import { UserService } from 'app/modules/service/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

import { MatDialog } from '@angular/material/dialog';
import { ValidDialog2Component } from './valid-dialog2/valid-dialog2.component';



@Component({
    selector       : 'contact',
    templateUrl    : './contact.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit, OnDestroy {
    host = environment.apiUrl; 
    data: any;
    authUser:any;
    demandes:any
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    displayedColumns = ['firstName','lastName' ,'email' ,'valider' ];
    dataSource = new MatTableDataSource<any>([]);

    afterFilter:any
    searchByName:any = ''

    @ViewChild(MatPaginator) paginator: MatPaginator;
    /**
     * Constructor
     */
    constructor( private matDialog:MatDialog ,
        private _projectService: ContactService,
        private _router: Router,
        private authService :AuthService,
        private userService :UserService,
        private detectRef :ChangeDetectorRef
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {

        this.dataSource.paginator = this.paginator;
        
        // Get the data
        this._projectService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {

                // Store the data
                this.data = data;

               console.log(data +"hfhfhfhfhfh")
               
            });

       this.authUser =this.authService.getAuthUserFromCache();
       this.getEntrepriseDemandes();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

 

    getEntrepriseDemandes(){
        this.userService.getEntrepriseDemandes(this.authUser.id).subscribe({

            next:(res:any)=>{
                this.demandes=this.dataSource.data =res
            }
        })
    }

   
    filterArray() {
        this.dataSource.data =this.demandes.filter(
         ( res:any) =>
             res.email
             
              .toString()
              .toLocaleLowerCase()
              .includes(this.searchByName.trim().toLowerCase())
              
    
        );
    }
    
  

    openvalidation2Component( id:any): void {
        const dialogRef = this.matDialog.open(ValidDialog2Component, {
         autoFocus: true,
         maxHeight: '900px',
         maxWidth: '1200px',
         data: id
       });
       dialogRef.afterClosed().subscribe({
        next :(res:any)=>{
            this.getEntrepriseDemandes() ;
        },
        error: (err:any)=>{
    
        }
      })
     }
    

   async  bloquer(userid:any){
        this.userService.bloquerOrDebloquer(userid).subscribe( {
               next:(res:any)=>{
               
               }
               ,error :(err:any)=>{
              window.location.reload()
               
               }
      
             
         })
        
      }

}
