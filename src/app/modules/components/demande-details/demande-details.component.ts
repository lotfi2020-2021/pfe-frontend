import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DemandeService } from 'app/modules/service/demande.service';


@Component({
  selector: 'app-demande-details',
  templateUrl: './demande-details.component.html',
  styleUrls: ['./demande-details.component.css']
})
export class DemandeDetailsComponent implements OnInit {
demande:any ;
  constructor(private demandeService :DemandeService ,@Inject(MAT_DIALOG_DATA) public id: any) { }

  ngOnInit(): void {
    this.demandeDetails(this.id);
  }


demandeDetails(id :any){

  this.demandeService.getDemandeById(id).subscribe({

next:(res:any)=>{

  this.demande =res
  console.log(res) ;
}
  })
  
}



}
