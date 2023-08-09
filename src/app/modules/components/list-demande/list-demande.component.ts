import { Component, OnInit ,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Demande } from 'app/modules/model/demande';
import { DemandeService } from 'app/modules/service/demande.service';
import { UserService } from 'app/modules/service/user.service';
import { NgxNotificationMsgService } from 'ngx-notification-msg';
import { ConfirmDialogDemandeComponent } from '../confirm-dialog-demande/confirm-dialog-demande.component';
import { DemandeDetailsComponent } from '../demande-details/demande-details.component';
import { ValidationDialogComponent } from '../validation-dialog/validation-dialog.component';


@Component({
  selector: 'app-list-demande',
  templateUrl: './list-demande.component.html',
  styleUrls: ['./list-demande.component.css']
})
export class ListDemandeComponent implements OnInit {
  displayedColumns = ['username', 'email', 'telephone','valider','delete','details', ];
  dataSource = new MatTableDataSource<Demande>([]);
  demandes:any ;
  searchByName:any;
  afterFitler

  

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor( 
    private demandeService:DemandeService,  private userService :UserService ,
    private readonly ngxNotificationMsgService: NgxNotificationMsgService,
    private snackBar:MatSnackBar,
    private matDialog: MatDialog,) { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getDemandes();

 

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


deleteDemande(id:any){
  this.demandeService.deleteDemande(id).subscribe(data  => {
         
  this.getDemandes()
       
   })
  
}

openConfirmationDialog(id : any): void {
  const dialogRef = this.matDialog.open(ConfirmDialogDemandeComponent, {
    width: '250px',
    data: id
  });

  dialogRef.afterClosed().subscribe({
    next :(res:any)=>{
       this.getDemandes();
    },
    error: (err:any)=>{

    }
  }) 
}

openValidiationDialog(demande : any): void {
  const dialogRef = this.matDialog.open(ValidationDialogComponent, {
    width: '250px',
    data: demande
  });

  dialogRef.afterClosed().subscribe({
    next :(res:any)=>{
       this.getDemandes();
    },
    error: (err:any)=>{

    }
  }) 
}



getDemandes(){
  this.demandeService.getDemandes().subscribe(data  => {
    this.demandes = this.dataSource.data =data
   console.log('demandes:',this.demandes)
   data.forEach( (el :any ) => {
      console.log('el',el)
  })
   })

  }

   

  filterArray() {
    this.dataSource.data = this.dataSource.data.filter(
      ( _:any) =>
         _.email
           .toString()
           .toLocaleLowerCase()
           .includes(this.searchByName.trim().toLowerCase())
           
     );
   }




          openDemandeDetails( id : any): void {
            this.matDialog.open(DemandeDetailsComponent, {
              data:id,
              autoFocus: false,
              maxHeight: '900px',
              maxWidth: '1200px'
            });
          }


}
