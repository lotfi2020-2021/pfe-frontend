import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, NgZone, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Chat } from 'app/modules/chat/chat.types';
import { ChatService } from 'app/modules/chat/chat.service';
import { AuthService } from 'app/modules/service/auth.service';
import { UserService } from 'app/modules/service/user.service';
import { ActivatedRoute, Route } from '@angular/router';
import { WebsocketService } from 'app/modules/service/websocket.service';
import { NotificationService } from 'app/modules/service/notification.service';
import { environment } from 'environments/environment.development';


@Component({
    selector       : 'chat-conversation',
    templateUrl    : './conversation.component.html',
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConversationComponent implements OnInit, OnDestroy
{
    host = environment.apiUrl; 
   chats :any
    receiverId:any
    body:any
    user:any
    authUser:any
    @ViewChild('messageInput') messageInput: ElementRef;
    chat: any;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = false;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _chatService: ChatService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _ngZone: NgZone,
        private authService :AuthService,
        private userService : UserService ,
        private route  :ActivatedRoute,
        private notificationService: NotificationService,
        private websocketService: WebsocketService,
       
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Decorated methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resize on 'input' and 'ngModelChange' events
     *
     * @private
     */
    @HostListener('input')
    @HostListener('ngModelChange')
    private _resizeMessageInput(): void
    {
        // This doesn't need to trigger Angular's change detection by itself
        this._ngZone.runOutsideAngular(() => {

            setTimeout(() => {

                // Set the height to 'auto' so we can correctly read the scrollHeight
                this.messageInput.nativeElement.style.height = 'auto';

                // Detect the changes so the height is applied
                this._changeDetectorRef.detectChanges();

                // Get the scrollHeight and subtract the vertical padding
                this.messageInput.nativeElement.style.height = `${this.messageInput.nativeElement.scrollHeight}px`;

                // Detect the changes one more time to apply the final height
                this._changeDetectorRef.detectChanges();
            });
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    { 
      
          this.connect();
        this.route.paramMap.subscribe({
            next:(params)=>{
            this.receiverId= params.get('id');
            if(this.receiverId){
                console.log(this.receiverId+"infoooo")
                 this.getUserById(this.receiverId);       
                 console.log(this.receiverId+"eeee")          
                      }
    }})

    this._chatService.chats$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((chats: any) => {
        this.chats = chats;
        
        // Mark for check
        this._changeDetectorRef.markForCheck();
 
    });

    this.getUserById( this.receiverId);
         this.authUser =this.authService.getAuthUserFromCache();
        
        // Chat
        this._chatService.chat$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((chat: any) => {
                this.chat = chat.reverse();
             
                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Set the drawerMode if the given breakpoint is active
                if ( matchingAliases.includes('lg') )
                {
                    this.drawerMode = 'side';
                }
                else
                {
                    this.drawerMode = 'over';
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
     * Open the contact info
     */
    openContactInfo(): void
    {
        // Open the drawer
        this.drawerOpened = true;

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Reset the chat
     */
    resetChat(): void
    {
        this._chatService.resetChat();

        // Close the contact info in case it's opened
        this.drawerOpened = false;

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


getUserById(id:any){
    this.userService.getUserById(id).subscribe({
        next :(res:any)=>{
          this.user=res  
          this._changeDetectorRef.detectChanges();

        }
    })
}


sendMessage(){
    this._chatService.sendMessage ( this.body ,this.receiverId).subscribe({
        next:(res:any)=>{
         
          this.body = '';

          this._chatService.chats$
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((chats: any) => {
              this.chats = chats;
              
              // Mark for check
              this._changeDetectorRef.markForCheck();
       
          });

          this._chatService.getChats(this.authUser.id).subscribe({
              next :(res:any)=>{
                  this.chats  =res
        
                  this._changeDetectorRef.markForCheck();
                 
              }
          });
}})
}

connect(): void {
    this.websocketService.connect();
    this.notificationService.chatMessage.subscribe((data) => {
      console.log('chattttttttttttttttttttttttttt', data);
     
     this.notifyMessage();
    //  this.chat.push(data);
    //  this._chatService.getChats();
this._chatService.getChatById( this.receiverId).subscribe({
    next:(res:any)=>{
this.chat=res
this._changeDetectorRef.detectChanges();
    }

  
})
    
    });
  }

  disconnect(): void {
    this.websocketService.disconnect();

  }


  notifyMessage(){
    this._chatService.chat$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((chat: any) => {
        this.chat = chat;
       
        // Mark for check
        this._changeDetectorRef.markForCheck();
    });
   

  }

}
