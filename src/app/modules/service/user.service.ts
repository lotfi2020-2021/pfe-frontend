import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';


import { ResetPassword } from '../model/reset-password';
import { UpdateUserEmail } from '../model/update-user-email';
import { UpdateUserInfo } from '../model/update-user-info';
import { UpdateUserPassword } from '../model/update-user-password';
import { User } from '../model/user';
import { UserResponse } from '../model/user-response';
import { environment } from 'environments/environment.development';


@Injectable({
	providedIn: 'root'
})
export class UserService {
	private host = environment.apiUrl;
	private jwtService = new JwtHelperService();

	constructor(private httpClient: HttpClient) { }

	getUserById(userId: number): Observable<UserResponse>  {
		return this.httpClient.get<UserResponse> (`${this.host}/users/${userId}`);
	}
	deleteUserById(userId: number): Observable<any>  {
		return this.httpClient.delete<any> (`${this.host}/User/delete/${userId}`);
	}

	getUsers(): Observable<any>  {
		return this.httpClient.get (`${this.host}/Users`);
	}

	getUsersByGroupId(id:any): Observable<any>  {
		return this.httpClient.get (`${this.host}/Users/Group/${id}`);
	}
	
	getEntreprise(): Observable<any>  {
		return this.httpClient.get (`${this.host}/Entreprises`);
	}

	getusersByEntreprise(userId:any): Observable<any>  {
		return this.httpClient.get (`${this.host}/Entreprise/users/${userId}`);
	}

	
	getUsersWithoutGroup(): Observable<any>  {
		return this.httpClient.get(`${this.host}/withoutGroup`);
	}
	bloquerOrDebloquer( userId : any): Observable<any>  {
		return this.httpClient.put(`${this.host}/User/Bloquer/${userId}`,userId);
	}

	
	verifyEmail(token: string): Observable<HttpResponse<any> > {
		return this.httpClient.post<HttpResponse<any> >(`${this.host}/verify-email/${token}`, null);
	   }
	   createEntreprise(demande: any): Observable<HttpResponse<any> > {
		return this.httpClient.post<HttpResponse<any> >(`${this.host}/CreateEntreprise`, demande);
	   }

	updateUserInfo(updateUserInfo: UpdateUserInfo , id :any): Observable<any > {
		return this.httpClient.put<any >(`${this.host}/account/update/info/${id}`, updateUserInfo);
	                }                                    

	updateUserEmail(updateUserEmail: UpdateUserEmail , id : any): Observable<any > {
		return this.httpClient.put<any >(`${this.host}/account/update/email/${id}`, updateUserEmail);
	        }

	updateUserPassword(updateUserPassword: UpdateUserPassword , id : any): Observable<any > {
		return this.httpClient.put<any >(`${this.host}/account/update/password/${id}`, updateUserPassword);
	         }

	  updateProfilePhoto(profilePhoto: File , id:any): Observable<User | HttpErrorResponse> {
				const formData = new FormData();
				formData.append('profilePhoto', profilePhoto);
				return this.httpClient.put<User | HttpErrorResponse>(`${this.host}/account/update/profile-photo/${id}`, formData);
			}


		
		

	forgotPassword(email: string): Observable<any > {
		const reqParams = new HttpParams().set('email', email);
		return this.httpClient.post<any >(`${this.host}/forgot-password`, null, { params: reqParams });
	                           }
		
		
						

	resetPassword(token: string, resetPassword: ResetPassword): Observable<any | HttpErrorResponse> {
		return this.httpClient.post<any >(`${this.host}/reset-password/${token}`, resetPassword);
	                     }
	 updateAccountEntreprise(userId:any, entrepriseId:any): Observable<any> {
							return this.httpClient.put<any >(`${this.host}/account/update/entreprise/${userId}/${entrepriseId}`,{});
											 }
	 getEntrepriseDemandes(id:any): Observable<any>  {
				return this.httpClient.get(`${this.host}/demandeUsers/${id}`);
											}

	assignUserToEntreprise(id:any): Observable<any>  {
	return this.httpClient.put(`${this.host}/assignUserToEntreprise/${id}`,null);
																			}
	annulerAssignUserToEntreprise(id:any): Observable<any>  {
		return this.httpClient.put(`${this.host}/annulerAsignUserToEntreprise/${id}`,null);
																											}
																							


	// sendEmail(toList:  any, subject: string, content: string): Observable<any> {
	
	// 	  const params = new HttpParams()
    // .set('toList', toList)
    // .set('subject', subject)
    // .set('content', content);

	// 	return this.httpClient.post(`${this.host}/send-email`, {}, { params });
						 // }

}
