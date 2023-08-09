import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ChatService } from '../chat.service';
import { Chat, Profile } from '../chat.types';
import { AuthService } from 'app/modules/service/auth.service';
import { environment } from 'environments/environment.development';



@Component({
    selector       : 'chat-chats',
    templateUrl    : './chats.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatsComponent implements OnInit, OnDestroy
{
    host = environment.apiUrl; 
    chat:any
    authUser :any ;
    chats: any;
    drawerComponent: 'profile' | 'new-chat';
    drawerOpened: boolean = false;
    filteredChats: any[];
    profile: any;
    selectedChat: any;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _chatService: ChatService, private authService :AuthService,
        private _changeDetectorRef: ChangeDetectorRef
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
     
       this.authUser= this.authService.getAuthUserFromCache()
        // Chats
        this._chatService.chats$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((chats: any) => {
                this.chats = this.filteredChats = chats;
                
                // Mark for check
                this._changeDetectorRef.markForCheck();
         
            });

            this._chatService.getChats(this.authUser.id).subscribe({
                next :(res:any)=>{
                    this.chats = this.filteredChats =res
          
                    this._changeDetectorRef.markForCheck();
                   
                }
            });

        // Profile
        this._chatService.profile$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((profile: any) => {
                this.profile = profile;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Selected chat
        this._chatService.chat$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((chat: any) => {
                this.selectedChat = chat;
               
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
     * Filter the chats
     *
     * @param query
     */
    filterChats(query: string): void
    {
        // Reset the filter
        if ( !query )
        {
            this.filteredChats = this.chats;
            return;
        }

        this.filteredChats = this.chats.filter(chat => chat.userNameReceiver.toLowerCase().includes(query.toLowerCase()));
    }

    /**
     * Open the new chat sidebar
     */
    openNewChat(): void
    {
        this.drawerComponent = 'new-chat';
        this.drawerOpened = true;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Open the profile sidebar
     */
    openProfile(): void
    {
        this.drawerComponent = 'profile';
        this.drawerOpened = true;

        // Mark for check
        this._changeDetectorRef.markForCheck();
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
