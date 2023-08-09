import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators, ValidatorFn, FormGroup, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { NgxNotificationDirection, NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { MatDialog } from '@angular/material/dialog';
import { DemandeEntrepriseComponent } from 'app/modules/components/demande-entreprise/demande-entreprise.component';
@Component({
    selector     : 'auth-sign-up',
    templateUrl  : './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthSignUpComponent implements OnInit
{
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signUpForm: UntypedFormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _router: Router,
        private readonly ngxNotificationMsgService: NgxNotificationMsgService,
        private matDialog :MatDialog,
    )
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
        // Create the form
        this.signUpForm = this._formBuilder.group({
                firstName  : ['', Validators.required],
                lastName  : ['', Validators.required],
                email     : ['', [Validators.required, Validators.email]],
                password  : ['', Validators.required],
                passwordRepeat  : ['', Validators.required],
               
            },{validators: this.matchPasswords}
        );
    }

    matchPasswords(formGroup: FormGroup) {
        const password = formGroup.get('password').value;
        const passwordRepeat = formGroup.get('passwordRepeat').value;
        if (password !== passwordRepeat) {
          formGroup.get('passwordRepeat').setErrors({ passwordMismatch: true });
        } else {
          formGroup.get('passwordRepeat').setErrors(null);
        }
      }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void
    {
        // Do nothing if the form is invalid
        if ( this.signUpForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._authService.signUp(this.signUpForm.value)
            .subscribe(
                (response) => {

                  
                    this._router.navigateByUrl('/confirmation-required');
                },
                (response) => {

                    // Re-enable the form
                    this.signUpForm.enable();

                    // Reset the form
                    this.signUpNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Something went wrong, please try another Email.'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );

        
    }





    openDemandeEntreprise(){
		const dialogRef = this.matDialog.open(DemandeEntrepriseComponent, {
			width: '800px',
			height: 'auto' ,
			
		  });

	}

}
