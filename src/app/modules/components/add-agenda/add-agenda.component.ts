import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Agenda } from 'app/modules/model/agenda';
import { GoogleCalenderService } from 'app/modules/service/google-calender.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-agenda',
  templateUrl: './add-agenda.component.html',
  styleUrls: ['./add-agenda.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(-10px)' })),
      ]),
    ]),
  ],
})
export class AddAgendaComponent implements OnInit {
  agendaForm: FormGroup;
  agenda: Agenda = new Agenda();
  constructor(  private formBuilder: FormBuilder , private snackBar :MatSnackBar , private dialogRef: MatDialogRef<AddAgendaComponent> ,
    private googleCalenderService :GoogleCalenderService , private toastr: ToastrService) { }



  ngOnInit() {
    this.agendaForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  
  saveAgenda() {
    if (this.agendaForm.valid) {
     
      this.agenda.summary = this.agendaForm.get('title').value;
      this.agenda.description = this.agendaForm.get('description').value;
      
      this.googleCalenderService.createAgenda(this.agenda).subscribe({
        next: (res: any) => {
          console.log(res);
          this.agendaForm.reset();
          // this.snackBar.open('Agenda added successfully', '', {
          //   duration: 5000,
          //   panelClass: 'snackbarstyle-green'
          // });
        
            this.toastr.success('Success', 'Agenda added successfully');
          
         
          this.closeAddAgenda();
        },
        error: (err: any) => {
          console.log(err);
          // this.snackBar.open('Failed to add agenda', '', {
          //   duration: 5000,
          //   panelClass: 'snackbarstyle-red'
          // });
          this.toastr.error('Failed', 'Failed to add agenda');
        }
      });
    } else {
      // mark all form fields as touched to show validation errors
      this.agendaForm.markAllAsTouched();
    }
  }


  closeAddAgenda(): void {
    this.dialogRef.close();
    
  }
}

