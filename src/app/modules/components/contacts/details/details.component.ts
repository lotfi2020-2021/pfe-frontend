import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Contact, Tag ,Country} from '../contacts.types';
import { ContactsListComponent } from '../list/list.component';
import { ContactsService } from '../contacts.service';
import { environment } from 'environments/environment.development';


@Component({
    selector       : 'contacts-details',
    templateUrl    : './details.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsDetailsComponent implements OnInit, OnDestroy
{
    countries: any[];
    host = environment.apiUrl; 
    @ViewChild('avatarFileInput') private _avatarFileInput: ElementRef;
    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;

    editMode: boolean = false;
   
   
    filteredTags: Tag[];
    contact: any;
 
    contacts: any[];
 
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _contactsListComponent: ContactsListComponent,
        private _contactsService: ContactsService,
        private _formBuilder: UntypedFormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _renderer2: Renderer2,
        private _router: Router,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef
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
        // Open the drawer
        this._contactsListComponent.matDrawer.open();

  

        // Get the contacts
        this._contactsService.contacts$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((contacts: any[]) => {
                this.contacts = contacts;

                // Mark for check
                this._changeDetectorRef.markForCheck();
                
            });

        // Get the contact
        this._contactsService.contact$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((contact: any) => {
console.log(contact +"contact")
                // Open the drawer in case it is closed
                this._contactsListComponent.matDrawer.open();

                // Get the contact
                this.contact = contact;

          

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

       // Get the country telephone codes
       this._contactsService.countries$
       .pipe(takeUntil(this._unsubscribeAll))
       .subscribe((codes: any[]) => {
           this.countries = codes;

           // Mark for check
           this._changeDetectorRef.markForCheck();
       });
     
      
    }

      /**
     * Get country info by iso code
     *
     * @param code
     */
      getCountryByIso(code: string): any
      {
      
      
          return this.countries.find(country => country.code === code);
          
      }
    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        // Dispose the overlays if they are still on the DOM
        if ( this._tagsPanelOverlayRef )
        {
            this._tagsPanelOverlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult>
    {
        return this._contactsListComponent.matDrawer.close();
    }

   

   

    /**
     * Delete the contact
     */
    deleteContact(): void
    {
        // Open the confirmation dialog
        const confirmation = this._fuseConfirmationService.open({
            title  : 'Delete contact',
            message: 'Are you sure you want to delete this contact? This action cannot be undone!',
            actions: {
                confirm: {
                    label: 'Delete'
                }
            }
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {

            // If the confirm button pressed...
            if ( result === 'confirmed' )
            {
                // Get the current contact's id
                const id = this.contact.id;

                // Get the next/previous contact's id
                const currentContactIndex = this.contacts.findIndex(item => item.id === id);
                const nextContactIndex = currentContactIndex + ((currentContactIndex === (this.contacts.length - 1)) ? -1 : 1);
                const nextContactId = (this.contacts.length === 1 && this.contacts[0].id === id) ? null : this.contacts[nextContactIndex].id;

           
                // Mark for check
                this._changeDetectorRef.markForCheck();
            }
        });

    }

  

  

 

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
