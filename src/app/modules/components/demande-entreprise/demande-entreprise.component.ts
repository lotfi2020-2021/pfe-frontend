import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DemandeService } from 'app/modules/service/demande.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-demande-entreprise',
  templateUrl: './demande-entreprise.component.html',
  styleUrls: ['./demande-entreprise.component.css']
})
export class DemandeEntrepriseComponent implements OnInit {
  demandeForm: FormGroup;
 

  constructor(private formBuilder: FormBuilder, private snackBar: MatSnackBar , private toastr :ToastrService , private demandeService :DemandeService , public dialogRef: MatDialogRef<DemandeEntrepriseComponent>,) { }

  ngOnInit(): void {
   
    this.demandeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required,Validators.maxLength(8),Validators.minLength(8)]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    const demande = this.demandeForm.value;
    if (this.demandeForm.valid) {
     
    
       this.demandeService.createDemande(demande).subscribe({
        next:(res:any)=>{
          console.log(this.demandeForm.value);
          // this.snackBar.open('Your demande has been sended!', 'Close', {
          //   duration: 3000,
          //   panelClass: 'snackbarstyle-green'
          // }).afterDismissed().subscribe(()=>{
          //   this.dialogRef.close();
          // });
          this.toastr.success('Your demande has been sended sucesfully','SUCCESS',  {
            timeOut: 7000});
            this.dialogRef.close();  
        }
       })

      
    } else {
      
      // this.snackBar.open('failed.', 'Close', {
      //   duration: 5000,
      //   panelClass: 'snackbarstyle-rouge'
      // });
      this.toastr.success('failure','ERROR',  {
        timeOut: 7000});
    }
  }  
  get f() { return this.demandeForm.controls; }
}

