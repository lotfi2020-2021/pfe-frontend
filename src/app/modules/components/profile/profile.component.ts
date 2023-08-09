import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'app/core/auth/auth.service';
import { UserService } from 'app/modules/service/user.service';
import { environment } from 'environments/environment.development';



@Component({
    selector       : 'profile',
    templateUrl    : './profile.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit
{
    host = environment.apiUrl; 
    profilePhoto:any ;
    authUser:any
   user:any;
   userId
    constructor(private authService :AuthService , private userService :UserService)
    {
    }
    ngOnInit(): void {
       this.authUser =this.authService.getAuthUserFromCache();
     this.getUserById(this.authUser.id);
    }



getUserById(id:any){
this.userService.getUserById(id).subscribe({
    next:(res:any)=>{
        console.log(res+"trtrtrtrtrtrtrtr")
     this.user=res
    
    }
})
}

}
