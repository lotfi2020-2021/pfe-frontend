import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ContactService } from './contact.service';



@Injectable({
    providedIn: 'root'
})
export class ContactResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(private _projectService: ContactService)
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        return this._projectService.getData();
    }
}
