
import { Component, Inject, Output, EventEmitter,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DemandeService } from 'app/modules/service/demande.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirm-dialog-demande',
  templateUrl: './confirm-dialog-demande.component.html',
  styleUrls: ['./confirm-dialog-demande.component.css']
})
export class ConfirmDialogDemandeComponent implements OnInit {

  @Output()
  public confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogDemandeComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any,
    private demandeService:DemandeService,private snackBar: MatSnackBar, private toastr :ToastrService,
    
  ) { }
  ngOnInit(): void {
   console.log(this.id)
  }

  onNoClick(): void {
    
    this.dialogRef.close();
  }

  onYesClick(): void {
   
    this.demandeService.deleteDemande(this.id).subscribe({
      next :(res: any)=>{
        // this.snackBar.open('delete successfully', '', {
        //   duration: 5000,
          
        //   panelClass: 'snackbarstyle-green'
        //   });
        this.toastr.success('delete successfully', 'Success', {
          timeOut: 7000
        })
    
      },
      error:(err : any)=>{
        // this.snackBar.open('failed', '', {
        //   duration: 5000,
          
        //   panelClass: 'snackbarstyle-rouge'
        //   });
        this.toastr.error('failed', 'ERROR', {
          timeOut: 7000
        })
      }
    })
    this.dialogRef.close();
  }
}
