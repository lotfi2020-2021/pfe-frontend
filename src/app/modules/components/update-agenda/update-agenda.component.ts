import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Agenda } from 'app/modules/model/agenda';
import { GoogleCalenderService } from 'app/modules/service/google-calender.service';


@Component({
  selector: 'app-update-agenda',
  templateUrl: './update-agenda.component.html',
  styleUrls: ['./update-agenda.component.css'],
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
export class UpdateAgendaComponent implements OnInit {

  agendaForm: FormGroup;
  agenda: Agenda;
  
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<UpdateAgendaComponent>,
    private googleCalenderService: GoogleCalenderService,
    @Inject(MAT_DIALOG_DATA) public id: any
  ) {}

  ngOnInit() {
    this.agendaForm = this.formBuilder.group({
      summary: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.getAgendaById(this.id);
  }

  updateAgenda() {
    if (this.agendaForm.valid) {
      const updateAgenda= this.agendaForm.value;
      this.googleCalenderService.updateAgenda(this.id,updateAgenda).subscribe({
        next: (res: any) => {
         
          this.agendaForm.reset();
        
        
        },
        error: (err: any) => {
         
        }
      });
    } else {
      this.agendaForm.markAllAsTouched();
    }
    this.closeUpdateAgenda();
  }

  closeUpdateAgenda(): void {
    this.dialogRef.close();
  }

  getAgendaById(id: any) {
    this.googleCalenderService.getCalenderById(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.agenda = res;
        this.agendaForm.setValue({
          summary: this.agenda.summary,
          description: this.agenda.description
        });
      },
      error: (err: any) => {}
    });
  }

}
