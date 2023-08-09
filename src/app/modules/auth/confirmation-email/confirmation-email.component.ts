import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { fuseAnimations } from '@fuse/animations';
import { AuthService } from 'app/core/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector     : 'auth-email',
    templateUrl  : './confirmation-email.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AuthConfirmationEmailComponent implements OnInit, OnDestroy {
	token: string;
	private jwtService = new JwtHelperService();
	private subscriptions: Subscription[] = [];

	constructor(
		private authService: AuthService,
		private route: ActivatedRoute) { }

	ngOnInit(): void {
		this.token = this.route.snapshot.paramMap.get('token');
console.log(this.token)
		if (this.token !== null) {
			if (!this.jwtService.isTokenExpired(this.token)) {
				this.subscriptions.push(
					this.authService.verifyEmail(this.token).subscribe(
						(response: HttpResponse<any>) => {

						},
						(errorResponse: HttpErrorResponse) => {

						}
					)
				);
			} 
		
	}
}

	ngOnDestroy(): void {
		this.subscriptions.forEach(sub => sub.unsubscribe());
	}
}
   

