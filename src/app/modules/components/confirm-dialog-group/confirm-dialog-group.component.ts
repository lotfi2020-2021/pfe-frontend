import { Component, Inject, Output, EventEmitter,OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GroupService } from 'app/modules/service/group.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-confirm-dialog-group',
  templateUrl: './confirm-dialog-group.component.html',
  styleUrls: ['./confirm-dialog-group.component.css']
})
export class ConfirmDialogGroupComponent implements OnInit {
  @Output()
  public confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any,
    private groupService:GroupService,private snackBar: MatSnackBar ,private toastr :ToastrService
    
  ) { }
  ngOnInit(): void {
   console.log(this.id)
  }

  onNoClick(): void {
    
    this.dialogRef.close();
  }

  onYesClick(): void {
   
    this.groupService.deleteGroup(this.id).subscribe({
      next :(res: any)=>{
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

