import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'app/modules/service/user.service';

@Component({
  selector: 'app-valid-dialog2',
  templateUrl: './valid-dialog2.component.html',
  styleUrls: ['./valid-dialog2.component.scss']
})
export class ValidDialog2Component implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ValidDialog2Component>,
    @Inject(MAT_DIALOG_DATA) public id: any,
    private userService:UserService,private snackBar: MatSnackBar 
    
  ) { }
  ngOnInit(): void {
   console.log(this.id + "eeeeeee")
  }

  onNoClick(): void {
    
    this.dialogRef.close();
  }



  onYesClick(): void {

      this.userService.assignUserToEntreprise(this.id).subscribe({
         
            next :(res: any)=>{
              this.dialogRef.close();

            },
            error:(err : any)=>{
              this.snackBar.open('failed', '', {
                duration: 5000,
                
                panelClass: 'snackbarstyle-rouge'
                });
            }
          })
          this.dialogRef.close();
        }
     
          

  
   

}
