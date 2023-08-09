import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { catchError, Observable, of, Subject, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { User } from '../user/user.types';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
export class AuthService
{  
    logoutSubject = new Subject<boolean>();
	loginSubject = new Subject<User>();
	userauth:any
	private authToken: string;
	private authUser: User;
	private principal: string;
	private jwtService = new JwtHelperService();
    private host = environment.apiUrl;
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private httpClient: HttpClient,
        private userService: UserService,
    
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    storeTokenInCache(authToken: string): void {
		if (authToken != null && authToken != '') {
			this.authToken = authToken;
			localStorage.setItem('authToken', authToken);
		}
	}

	loadAuthTokenFromCache(): void {
		this.authToken = localStorage.getItem('authToken');
	}

	getAuthTokenFromCache(): string {
		return localStorage.getItem('authToken');
	}

	storeAuthUserInCache(authUser: User): void {
		if (authUser != null) {
			this.authUser = authUser;
			localStorage.setItem('authUser', JSON.stringify(authUser));
		}
		this.loginSubject.next(authUser);
	}

	getAuthUserFromCache(): User {
		return JSON.parse(localStorage.getItem('authUser'));
	}

	getAuthUserId(): number {
		return this.getAuthUserFromCache().id;
	}
    set accessToken(authToken: string)
    {
        if (authToken != null && authToken != '') {
			this.authToken = authToken;
			localStorage.setItem('authToken', authToken);
		}
    }

    get accessToken(): string
    {
        return localStorage.getItem('authToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
	verifyEmail(token: string): Observable<HttpResponse<any> > {
		return this.httpClient.post<HttpResponse<any> >(`${this.host}/verify-email/${token}`, null);
	   }
    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any>
    {
        const reqParams = new HttpParams().set('email', email);
        return this.httpClient.post<any >(`${this.host}/forgot-password`, null, { params: reqParams });
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword( token:any , resetPassword: {password:string; passwordRepeat: string} ): Observable<any | HttpErrorResponse> 
    {
        return this.httpClient.post<any >(`${this.host}/reset-password/${token}`, resetPassword);
    }

   
    /**
     * Sign in
     *
     * @param credentials
     */
    signIn(credentials: { email: string; password: string }): Observable<HttpResponse<any> | HttpErrorResponse>
    {
        // Throw error, if the user is already logged in
        if ( this._authenticated )
        {
            return throwError('User is already logged in.');
        }

        return this.httpClient.post(`${this.host}/login`, credentials, { observe: 'response' }).pipe(
            switchMap((response: any) => {
        
					const authToken = response.headers.get('Jwt-Token');
				
				
						this.storeAuthUserInCache(response.body);
				//this.userauth=	this.getAuthUserFromCache();
				//console.log(this.userauth)	;
                    // Store the access token in the local storage
            console.log(response.body)
                    this.accessToken=authToken;
                    // Set the authenticated flag to true
                    this._authenticated = true;
    
                    // Store the user on the user service
                    this.userService.user = response.user;
					for (let element in response.body) {
					console.warn(element + ": " + response[element]);
				  };

				
					
				

                // Return a new observable with the response
                return of(response);
            })
        );
    }

    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any>
    {
        // Sign in using the token
        return this.httpClient.post('api/auth/sign-in-with-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Replace the access token with the new one if it's available on
                // the response object.
                //
                // This is an added optional step for better security. Once you sign
                // in using the token, you should generate a new one on the server
                // side and attach it to the response object. Then the following
                // piece of code can replace the token with the refreshed one.
                if ( response.accessToken )
                {
                    this.accessToken = response.accessToken;
                }

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this.userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

    /**
     * Sign out
     */
    signOut(): Observable<any>
    {
        // Remove the access token from the local storage
        this.authToken = null;
		this.authUser = null;
		this.principal = null;
		localStorage.removeItem('authUser');
		localStorage.removeItem('authToken');
		this.logoutSubject.next(true);

        // Set the authenticated flag to false
        this._authenticated = false;

        // Return the observable
        return of(true);
    }

  
    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { firstName: any; lastName :any ; email: string; password: any;passwordRepeat:any }): Observable<any>
    {
        return this.httpClient.post<HttpResponse<any> | HttpErrorResponse>(`${this.host}/signup`, user)
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any>
    {
        return this.httpClient.post(`${this.host}/login`, credentials, { observe: 'response' });
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean>
    {
        // Check if the user is logged in
        if ( this._authenticated )
        {
            return of(true);
        }

        // Check the access token availability
        if ( !this.accessToken )
        {
            return of(false);
        }

        // // Check the access token expire date
        if ( AuthUtils.isTokenExpired(this.accessToken) )
        {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
 }
