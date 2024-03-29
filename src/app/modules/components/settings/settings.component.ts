import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector       : 'settings',
    templateUrl    : './settings.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit, OnDestroy
{
    @ViewChild('drawer') drawer: MatDrawer;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    panels: any[] = [];
    authUser:any
    selectedPanel: string = 'account';
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor( private authService: AuthService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseMediaWatcherService: FuseMediaWatcherService
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
        this.authUser =this.authService.getAuthUserFromCache();
        // Setup available panels
        if(this.authUser.role ==="user"){
            this.panels = [
                {
                    id         : 'account',
                    icon       : 'heroicons_outline:user-circle',
                    title      : 'Account',
                    description: 'Manage your public profile and private information'
                },
                {
                    id         : 'security',
                    icon       : 'heroicons_outline:lock-closed',
                    title      : 'Security',
                    description: 'Manage your password and 2-step verification preferences'
                },
                {
                    id         : 'plan-billing',
                    icon       : 'heroicons_outline:mail',
                    title      : 'Change your Email',
                    description: 'Manage your Email'
                },
                {
                    id         : 'team',
                    icon       : 'heroicons_outline:home',
                    title      : 'Change your Company',
                    description: 'Manage your Company'
                },
            ];
        }else{

            this.panels = [
                {
                    id         : 'account',
                    icon       : 'heroicons_outline:user-circle',
                    title      : 'Account',
                    description: 'Manage your public profile and private information'
                },
                {
                    id         : 'security',
                    icon       : 'heroicons_outline:lock-closed',
                    title      : 'Security',
                    description: 'Manage your password and 2-step verification preferences'
                },
                {
                    id         : 'plan-billing',
                    icon       : 'heroicons_outline:mail',
                    title      : 'Change your Email',
                    description: 'Manage your Email'
                },
            
            ];

        }
        

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Set the drawerMode and drawerOpened
                if ( matchingAliases.includes('lg') )
                {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                }
                else
                {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Navigate to the panel
     *
     * @param panel
     */
    goToPanel(panel: string): void
    {
        this.selectedPanel = panel;

        // Close the drawer on 'over' mode
        if ( this.drawerMode === 'over' )
        {
            this.drawer.close();
        }
    }

    /**
     * Get the details of the panel
     *
     * @param id
     */
    getPanelInfo(id: string): any
    {
     
        return this.panels.find(panel => panel.id === id);
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
