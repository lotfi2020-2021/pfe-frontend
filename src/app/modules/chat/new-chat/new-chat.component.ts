import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { Contact } from 'app/modules/chat/chat.types';
import { ChatService } from 'app/modules/chat/chat.service';
import { environment } from 'environments/environment.development';


@Component({
    selector       : 'chat-new-chat',
    templateUrl    : './new-chat.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewChatComponent implements OnInit, OnDestroy
{
    host = environment.apiUrl; 
    @Input() drawer: MatDrawer;
    contacts: any[] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(private _chatService: ChatService,
        private _changeDetectorRef: ChangeDetectorRef,)
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
        // Contacts
        this._chatService.contacts$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((contacts: any[]) => {
                this.contacts = contacts;
                this._changeDetectorRef.detectChanges();
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
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    createChatroom(receiverId:any){
        this._chatService.createChatroom(receiverId).subscribe({
            next :(res:any)=>{
                
            }
        })
    }
}
