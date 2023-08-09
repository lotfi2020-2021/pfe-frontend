import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UpdateUserPassword } from 'app/modules/model/update-user-password';
import { User } from 'app/modules/model/user';
import { AuthService } from 'app/modules/service/auth.service';
import { UserService } from 'app/modules/service/user.service';

import { environment } from 'environments/environment';
import { Subscription } from 'rxjs';

@Component({
    selector       : 'settings-security',
    templateUrl    : './security.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsSecurityComponent implements OnInit
{
    authUser: User;
	authUserId: any;
	coverPhoto: any;
  profilePhoto:any;
  showPassword = false;
  showPassword1 = false;
  showPassword2 = false;
  showPassword3 = false;



	updatePasswordFormGroup: FormGroup;


	private subscriptions: Subscription[] = [];
 

  constructor(
    private userService: UserService,
		private authService: AuthService,
		
		private activatedRoute: ActivatedRoute,
	
		private formBuilder: FormBuilder,
	
		private router: Router
  ) { }
	

	get updatePasswordNewPassword() { return this.updatePasswordFormGroup.get('password') }
	get updatePasswordPasswordRepeat() { return this.updatePasswordFormGroup.get('passwordRepeat') }
	get updatePasswordOldPassword() { return this.updatePasswordFormGroup.get('oldPassword') }


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

	

  

  this.updatePasswordFormGroup = this.formBuilder.group({
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    passwordRepeat: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)]),
    oldPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(32)])
  } ,{ validators: this.matchPasswords });
}

ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
}

matchPasswords: ValidatorFn = (group: FormGroup): ValidationErrors | null => {
  const password = group.get('password').value;
  const passwordRepeat = group.get('passwordRepeat').value;
  return password === passwordRepeat ? null : { passwordMissMatch: true }
}



UpdatePassword(): void {

  const updateUserPassword = new UpdateUserPassword();
  updateUserPassword.password = this.updatePasswordFormGroup.get('password').value;
  updateUserPassword.passwordRepeat = this.updatePasswordFormGroup.get('passwordRepeat').value;
  updateUserPassword.oldPassword = this.updatePasswordFormGroup.get('oldPassword').value;

  this.subscriptions.push(
    this.userService.updateUserPassword(updateUserPassword , this.authUserId).subscribe({
      next: (result: any) => {
      
        this.authService.logout();
        window.location.replace('sign-in');
      },
      error: (errorResponse: HttpErrorResponse) => {
     console.log(errorResponse)
      }
    })
  );
}
}
