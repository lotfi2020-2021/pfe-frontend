import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'app/modules/model/user';
import { AuthService } from 'app/modules/service/auth.service';
import { UserService } from 'app/modules/service/user.service';
import { environment } from 'environments/environment.development';

import { Subscription } from 'rxjs';




@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {
	photoviewUrl: any;
	photo: File;
	 host = environment.apiUrl; 

  authUser: any ;
	private subscriptions: Subscription[] = [];

	constructor(
		
		private authService: AuthService,
		private userService: UserService,
		private thisDialogRef: MatDialogRef<PhotoUploadComponent>,
		) { }

	ngOnInit(): void {
	
		this.authUser =this.authService.getAuthUserFromCache();
		
	
  }



	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}

	selectPhoto(e: any): void {
		if (e.target.files) {
			this.photo = e.target.files[0];
      
			const reader = new FileReader();
			reader.readAsDataURL(this.photo);
			reader.onload = (e: any) => {
				this.photoviewUrl = e.target.result;
			}
		}
	}

	savePhoto(): void {
    console.log("bbbbbbbbb"+this.photo)
		if (this.photo) {
			
				this.subscriptions.push(
					this.userService.updateProfilePhoto(this.photo ,this.authUser.id).subscribe({
						next: (updatedUser: User) => {
							this.authService.storeAuthUserInCache(updatedUser);
							
							
							this.thisDialogRef.close({ updatedUser });
							window.location.replace('/apps/account');
						},
						error: (errorResponse: HttpErrorResponse) => {
				
						}
					})
				);
			} 
		} 
	




	


}