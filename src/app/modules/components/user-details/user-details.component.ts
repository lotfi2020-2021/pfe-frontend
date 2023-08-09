import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'app/modules/service/user.service';


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
user:any;
  constructor(@Inject(MAT_DIALOG_DATA) public id: any,
  private userService: UserService) { }

  ngOnInit(): void {
    console.log("id:"+this.id)
this.GetUserById();
  }



  GetUserById(){
    this.userService.getUserById(this.id).subscribe({
      next:(res:any)=>{
        this.user=res ;
console.log(res)
      }
      }

    )}
  }


















