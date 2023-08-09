import { Component, Inject, Output, EventEmitter,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DemandeService } from 'app/modules/service/demande.service';
import { UserService } from 'app/modules/service/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-validation-dialog',
  templateUrl: './validation-dialog.component.html',
  styleUrls: ['./validation-dialog.component.css']
})
export class ValidationDialogComponent implements OnInit {


  @Output()
  public confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<ValidationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public demande: any,
    private demandeService:DemandeService, private userService:UserService,private snackBar: MatSnackBar ,private toastr :ToastrService ,
    
  ) { }
  ngOnInit(): void {
   console.log(this.demande + "jjjjjjjjjj")
  }

  onNoClick(): void {
    
    this.dialogRef.close();
  }



  onYesClick(): void {
    this.demandeService.updateDemande(this.demande.id).subscribe(()=>{
     // this.snackBar.open('validation successfully ', 'Close', {
      //  duration: 2000,
       // panelClass: 'snackbarstyle-green'
       // }).afterDismissed().subscribe(() => {
        // this.snackBar.open('A confirmation email has been sent  successfully.', 'Close', {
        //   duration: 5000,
          
        //   panelClass: 'snackbarstyle-orange'
        //   });	
        // });
        
        this.toastr.success('validation successfully', 'Success', {
          timeOut: 7000
        }).onHidden.subscribe(() => {
          this.toastr.info('A confirmation email has been sent  successfully','INFO',  {
            timeOut: 7000});
        });
      this.userService.createEntreprise(this.demande).subscribe({
        next :(res: any)=>{
        
        
      
        },
        error:(err : any)=>{
          // this.snackBar.open('failed', '', {
          //   duration: 5000,
            
          //   panelClass: 'snackbarstyle-rouge'
          //   });
          this.toastr.error('failed','ERROR',  {
            timeOut: 7000});
        }
      })
      this.dialogRef.close();
   
 
  }) 
  }


}
