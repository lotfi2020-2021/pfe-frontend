import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { Country } from 'app/modules/model/country';
import { UpdateUserInfo } from 'app/modules/model/update-user-info';
import { User } from 'app/modules/model/user';
import { CountryService } from 'app/modules/service/country.service';
import { UserService } from 'app/modules/service/user.service';

import { Subscription } from 'rxjs';
import { PhotoUploadComponent } from '../../photo-upload/photo-upload.component';
import * as moment from 'moment';
import { environment } from 'environments/environment.development';
@Component({
    selector       : 'settings-account',
    templateUrl    : './account.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsAccountComponent implements OnInit
{
  host = environment.apiUrl; 
    user:any
    authUserId:any
	authUser: any;
  profilePhoto:any;
  entrepriseList:any;
	countryList: Country[] = [];
	updateInfoFormGroup: FormGroup;



	private subscriptions: Subscription[] = [];
 

  constructor(
        private userService: UserService,
		private authService: AuthService,
		private activatedRoute: ActivatedRoute,
		private matDialog: MatDialog,
        private countryService: CountryService,
		private formBuilder: FormBuilder,
		private router: Router
  ) { }
	get updateInfoFirstName() { return this.updateInfoFormGroup.get('firstName') }
	get updateInfoLastName() { return this.updateInfoFormGroup.get('lastName') }
	get updateInfoIntro() { return this.updateInfoFormGroup.get('intro') }
  get updateInfoTelephone() { return this.updateInfoFormGroup.get('telephone') }
	get updateInfoGender() { return this.updateInfoFormGroup.get('gender') }
	get updateInfoHometown() { return this.updateInfoFormGroup.get('hometown') }
	get updateInfoCurrentCity() { return this.updateInfoFormGroup.get('currentCity') }
	get updateInfoEduInstitution() { return this.updateInfoFormGroup.get('eduInstitution') }
	get updateInfoWorkplace() { return this.updateInfoFormGroup.get('workplace') }
	get updateInfoCountryName() { return this.updateInfoFormGroup.get('countryName') }
	get updateInfoBirthDate() { return this.updateInfoFormGroup.get('birthDate') }
    get updateInfoEntrepriseId() { return this.updateInfoFormGroup.get('entrepriseId') }

	


	ngOnInit(): void {
		
			
			this.authUser = this.authService.getAuthUserFromCache();

				this.authUserId = this.authService.getAuthUserId();
       this.getUserById(this.authUser.id);

	this.countryService.getCountryList().subscribe({
    next: (countryList: Country[]) => {
      this.countryList = countryList;
    },
    error: (errorResponse: HttpErrorResponse) => { }
  });

  this.userService.getEntreprise().subscribe({
    next: (entrepriseList: any) => {
      this.entrepriseList = entrepriseList.filter(user => user.id !== this.authUser.id);;
    },
    error: (errorResponse: HttpErrorResponse) => { }
  });
  this.updateInfoFormGroup = this.formBuilder.group({
    firstName: new FormControl(this.authUser.firstName, [Validators.required, Validators.maxLength(64)]),
    telephone: new FormControl(this.authUser.telephone, [Validators.required, Validators.maxLength(10)]),
    email: new FormControl(this.authUser.email, [Validators.required,]),
    lastName: new FormControl(this.authUser.lastName, [Validators.required, Validators.maxLength(64)]),
    intro: new FormControl(this.authUser.intro, [Validators.maxLength(100)]),
    hometown: new FormControl(this.authUser.hometown, [Validators.maxLength(128)]),
    currentCity: new FormControl(this.authUser.currentCity, [Validators.maxLength(128)]),
    eduInstitution: new FormControl(this.authUser.eduInstitution, [Validators.maxLength(128)]),
    workplace: new FormControl(this.authUser.workplace, [Validators.maxLength(128)]),
    gender: [this.authUser.gender],
    countryName: [this.authUser.country?.name ? this.authUser.country.name : null],
    birthDate: [this.authUser.birthDate , Validators.required],
    entrepriseId: [this.authUser.entrepriseId ? this.authUser.entrepriseId : null, Validators.required]
    

  });




}


getUserById(id:any){
    this.userService.getUserById(id).subscribe({
        next:(res:any)=>{
this.user =res
console.log(res)

        }
    })
}


ngOnDestroy(): void {
  this.subscriptions.forEach(sub => sub.unsubscribe());
}




uploadPhoto(e: Event): void {
  e.stopPropagation();
  const dialogRef = this.matDialog.open(PhotoUploadComponent, {
    data: { authUser: this.authUser },
    autoFocus: false,
    minWidth: '400px',
    maxWidth: '900px',
    maxHeight: '550px'
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      
        this.profilePhoto = result.updatedUser.profilePhoto;
     
    }
  });
}






UpdateInfo(): void {

  const updateUserInfo = new UpdateUserInfo();
  updateUserInfo.telephone = this.updateInfoTelephone.value;
  updateUserInfo.firstName = this.updateInfoFirstName.value;
  updateUserInfo.lastName = this.updateInfoLastName.value;
  updateUserInfo.intro = this.updateInfoIntro.value;
  updateUserInfo.gender = this.updateInfoGender.value;
  updateUserInfo.hometown = this.updateInfoHometown.value;
  updateUserInfo.currentCity = this.updateInfoCurrentCity.value;
  updateUserInfo.eduInstitution = this.updateInfoEduInstitution.value;
  updateUserInfo.workplace = this.updateInfoWorkplace.value;
  updateUserInfo.countryName = this.updateInfoCountryName.value;
  updateUserInfo.birthDate = moment(this.updateInfoBirthDate.value).format('YYYY-MM-DD HH:mm:ss').toString();

  this.subscriptions.push(
    this.userService.updateUserInfo(updateUserInfo,this.authUserId).subscribe({
      next: (updatedUser: User) => {
    
        this.router.navigateByUrl('/apps/profile');
      },
      error: (errorResponse: HttpErrorResponse) => {
       
      }
    })
  );
}







}
