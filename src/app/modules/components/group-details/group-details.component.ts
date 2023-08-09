import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GroupService } from 'app/modules/service/group.service';
import { UserService } from 'app/modules/service/user.service';
import { environment } from 'environments/environment.development';


@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class GroupDetailsComponent implements OnInit {
  host=environment.apiUrl;
  members:any
  group:any ;
  showMembers: boolean = false;
  constructor( private userService: UserService ,private groupService :GroupService ,@Inject(MAT_DIALOG_DATA) public id: any) { }

  ngOnInit(): void {
    this.groupDetails(this.id);
    this.usersByGroupId(this.id);
  }


groupDetails(id :any){

  this.groupService.getGroupById(id).subscribe({

next:(res:any)=>{

  this.group =res
  console.log("group"+res) ;
}
  })
  
}


usersByGroupId(id :any){

  this.userService.getUsersByGroupId(id).subscribe({

next:(res:any)=>{

  this.members =res
}
  })
  
}



}
