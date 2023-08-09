import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UpdateUserEmail } from 'app/modules/model/update-user-email';
import { User } from 'app/modules/model/user';
import { AuthService } from 'app/modules/service/auth.service';
import { UserService } from 'app/modules/service/user.service';
import { Subscription } from 'rxjs';

@Component({
    selector       : 'settings-change-email',
    templateUrl    : './change-email.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsChangeEmailComponent implements OnInit
{
    authUser: User;
	authUserId: any;
	coverPhoto: any;
  profilePhoto:any;

  showPassword2 = false;


	updateEmailFormGroup: FormGroup;



	private subscriptions: Subscription[] = [];
 

  constructor(
    private userService: UserService,
		private authService: AuthService,
		private router :Router,
		private formBuilder: FormBuilder,

  ) { }


	get updateEmailNewEmail() { return this.updateEmailFormGroup.get('email') }
	get updateEmailPassword() { return this.updateEmailFormGroup.get('password') }




	ngOnInit(): void {
		
			
			this.authUser = this.authService.getAuthUserFromCache();

				this.authUserId = this.authService.getAuthUserId();
	this.subscriptions.push(
    this.userService.getUserById(this.authUserId).subscribe({
      next: () => {
   
        
      },
      error: (errorResponse: HttpErrorResponse) => {
       
      }
    })
  );



 

  this.updateEmailFormGroup = this.formBuilder.group({
    email: new FormControl(this.authUser.email, [Validators.required, Validators.email, Validators.maxLength(64)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)])
  });


}

ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
}











UpdateEmail(): void {

  const updateUserEmail = new UpdateUserEmail();
  updateUserEmail.email = this.updateEmailFormGroup.get('email').value;
  updateUserEmail.password = this.updateEmailFormGroup.get('password').value;

  this.subscriptions.push(
    this.userService.updateUserEmail(updateUserEmail , this.authUserId).subscribe({
      next: (result: any) => {

     
         this.authService.logout();
        this.router.navigateByUrl('/confirmation-required');
      
      }
      ,
      error: (errorResponse: HttpErrorResponse) => {
        const validationErrors = errorResponse.error.validationErrors;
     console.log(errorResponse)
       
      }
    })
  );
}


}
