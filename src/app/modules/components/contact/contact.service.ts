import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from 'app/modules/service/auth.service';
import { UserService } from 'app/modules/service/user.service';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class ContactService 
{
    userId:any
    private host = environment.apiUrl;
    private _data: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient , private userService :UserService , private authService :AuthService)
    {
       this.userId =this.authService.getAuthUserId(); 
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for data
     */
    get data$(): Observable<any>
    {
        return this._data.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get data
     */
    getData(): Observable<any>
    {
     return  this._httpClient.get (`${this.host}/Entreprise/users/${this.userId}`).pipe(
            tap((response: any) => {
                this._data.next(response);
            })
        );
    }
}
