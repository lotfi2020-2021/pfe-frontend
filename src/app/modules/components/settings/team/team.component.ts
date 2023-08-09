import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'app/modules/service/auth.service';
import { UserService } from 'app/modules/service/user.service';

@Component({
    selector       : 'settings-team',
    templateUrl    : './team.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
      trigger('blink', [
        transition(':enter', [
          style({ transform: 'translateY(-100%)', opacity: 0 }),
          animate('500ms ease-out', style({ transform: 'translateY(0)', opacity: 1 })),
          animate('6000ms ease-out', keyframes([
            style({ opacity: 1 }),
            style({ opacity: 0 }),
            style({ opacity: 1 }),
            style({ opacity: 0 }),
            style({ opacity: 1 })
          ]))
        ])
      ])
    ]
 
})
export class SettingsTeamComponent implements OnInit
{

  animationState: 'start' | 'end' = 'start';
    entreprise:any
    user:any
   
    authUserId:any
	authUser: any;
  profilePhoto:any;
  entrepriseList:any;
    members: any[];
    roles: any[];
    selectedEntrepriseId: any;
    /**
     * Constructor
     */
    constructor(private userService :UserService , private authService :AuthService ,private detecRef : ChangeDetectorRef) 
    {

    }
 
 

  
  
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    { 
       
               if( this.authUser !==null){
                this.authUser =this.authService.getAuthUserFromCache();
                this.getUser(this.authUser.id)
               }
        

     

        this.userService.getEntreprise().subscribe({
            next: (entrepriseList: any) => {
              this.entrepriseList = entrepriseList.filter(user => user.id !== this.authUser.id);;
            },
            error: (errorResponse: HttpErrorResponse) => { }
          });
          this.getUser(this.authUser.id)
       

    }


  

    updateAccountEntreprise(){
      this.userService.updateAccountEntreprise(this.authUser.id,this.selectedEntrepriseId).subscribe({
        next : (res:any)=>{
      
          this.getUser(this.authUser.id)
      
        }
      })
      
      
      }


   
        

          getUser(id:any){
            
            this.userService.getUserById(this.authUser.id).subscribe((res:any)=>{
          this.user =res 
          console.log("resrttttt"+res)
        
        
            })
          }

  
 




       cancelAsignCompany(){

        this.userService.annulerAssignUserToEntreprise(this.authUser.id).subscribe({
          next:(res:any)=>{
           console.log("lotfi")
            this.getUser(this.authUser.id)
        
            
          
          },
          error:(res:any)=>{
            this.getUser(this.authUser.id)
         
          }
        })
       }

   
    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
