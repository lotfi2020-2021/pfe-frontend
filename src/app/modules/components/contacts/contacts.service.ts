import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { Contact, Country, Tag } from './contacts.types';
import { UserService } from 'app/modules/service/user.service';
import { AuthService } from 'app/modules/service/auth.service';
import { environment } from 'environments/environment.development';


@Injectable({
    providedIn: 'root'
})
export class ContactsService
{
    userId:any
    private host = environment.apiUrl;

    private _contact: BehaviorSubject<Contact | null> = new BehaviorSubject(null);
    private _contacts: BehaviorSubject<Contact[] | null> = new BehaviorSubject(null);
    private _countries: BehaviorSubject<Country[] | null> = new BehaviorSubject(null);
    private _tags: BehaviorSubject<Tag[] | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient ,private userService :UserService , private authService :AuthService)
    {
       this.userId =this.authService.getAuthUserId(); 
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for contact
     */
    get contact$(): Observable<Contact>
    {
        return this._contact.asObservable();
    }

    /**
     * Getter for contacts
     */
    get contacts$(): Observable<Contact[]>
    {
        return this._contacts.asObservable();
    }

    /**
     * Getter for countries
     */
    get countries$(): Observable<Country[]>
    {
        return this._countries.asObservable();
    }

    /**
     * Getter for tags
     */
    get tags$(): Observable<Tag[]>
    {
        return this._tags.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get contacts
     */
    getContacts(): Observable<any[]>
    {

        return  this._httpClient.get (`${this.host}/Entreprise/users/${this.userId}`).pipe(
            tap((response: any) => {
                this._contacts.next(response);
            })
        );

    
    }



    /**
     * Get contact by id
     */
    getContactById(id: string): Observable<Contact>
    {

        return this._httpClient.get<any> (`${this.host}/users/${id}`).pipe(
            tap((response: any) => {
                this._contact.next(response);
            })
        );
    }



   

 

    /**
     * Get countries
     */
    getCountries(): Observable<Country[]>
    {
        return this._httpClient.get<Country[]>('api/apps/contacts/countries').pipe(
            tap((countries) => {
                this._countries.next(countries);
            })
        );
    }

 
 
    // searchContacts(): Observable<any>
    // {
    //     return  this._httpClient.get (`${this.host}/Entreprise/users/${this.userId}`).pipe(
    //         tap((response: any) => {
    //             this._contacts.next(response);
    //         })
    //     );
    
    // }
 




   
}
