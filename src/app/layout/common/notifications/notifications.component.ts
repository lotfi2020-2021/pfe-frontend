import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation,EventEmitter } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatButton } from '@angular/material/button';
import { BehaviorSubject, Subject, Subscription, takeUntil } from 'rxjs';
import { Notification } from 'app/layout/common/notifications/notifications.types';
import { NotificationsService } from 'app/layout/common/notifications/notifications.service';
import { MatDialog } from '@angular/material/dialog';
import { NotificationBellInfoComponent } from 'app/modules/components/notification-bell-info/notification-bell-info.component';
import { AuthService } from 'app/modules/service/auth.service';
import {  NgxNotificationDirection, NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';
import { NotificationService } from 'app/modules/service/notification.service';
import { WebsocketService } from 'app/modules/service/websocket.service';
import { environment } from 'environments/environment.development';
import { ToastrService } from 'ngx-toastr';




@Component({
    selector       : 'notifications',
    templateUrl    : './notifications.component.html',
    exportAs       : 'notifications'
})
export class NotificationsComponent implements OnInit, OnDestroy
{
    host = environment.apiUrl; 
    @ViewChild('notificationsOrigin') private _notificationsOrigin: MatButton;
    @ViewChild('notificationsPanel') private _notificationsPanel: TemplateRef<any>;
    
    user:any
    counter: number;
    notifications: any[];
    unreadCount = new BehaviorSubject(0);
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    lenghtNotification = this.unreadCount.asObservable()
   
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _notificationsService: NotificationsService,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        private matDialog: MatDialog,
        private authService :AuthService,
        private readonly ngxNotificationMsgService: NgxNotificationMsgService,
        private notificationService: NotificationService,
        private websocketService: WebsocketService,private toastr: ToastrService
    )
    {
    }
    private notificationSubscription: Subscription;
    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        
        

    this.connect();
    this.user = this.authService.getAuthUserFromCache()
    this.counter = 0;
        // Subscribe to notification changes
        this._notificationsService.notifications$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((notifications: any[]) => {

                // Load the notifications
                this.notifications = notifications

                // Calculate the unread count
                this._calculateUnreadCount();

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

        // Dispose the overlay
        if ( this._overlayRef )
        {
            this._overlayRef.dispose();
        }
    }




    openNotificationDetails( id:any): void {
        const dialogRef = this.matDialog.open(NotificationBellInfoComponent, {
         autoFocus: true,
         maxHeight: '900px',
         maxWidth: '1200px',
         data: id
       });
       dialogRef.afterClosed().subscribe({
        next :(res:any)=>{
        
        },
        error: (err:any)=>{
       
        }
       })
       }
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Open the notifications panel
     */
    openPanel(): void
    {
      
        // Return if the notifications panel or its origin is not defined
        if ( !this._notificationsPanel || !this._notificationsOrigin )
        {
            return;
        }

        // Create the overlay if it doesn't exist
        if ( !this._overlayRef )
        {
            this._createOverlay();
        }

        // Attach the portal to the overlay
        this._overlayRef.attach(new TemplatePortal(this._notificationsPanel, this._viewContainerRef));
    }

    /**
     * Close the notifications panel
     */
    closePanel(): void
    {
        this._overlayRef.detach();
    }

    /**
     * Mark all notifications as read
     */
    markAllAsRead(): void
    {
        // Mark all as read
        this._notificationsService.markAllAsRead().subscribe();
    }

    /**
     * Toggle read status of the given notification
     */
    toggleRead(notification: any): void
    {
        // Toggle the read status
        notification.isSeen = !notification.isSeen;

        // Update the notification
        this._notificationsService.update(notification.id, notification).subscribe();
    }

    /**
     * Delete the given notification
     */
    delete(notification: any): void
    {
        // Delete the notification
        this._notificationsService.delete(notification.id).subscribe();
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

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create the overlay
     */
    private _createOverlay(): void
    {
        // Create the overlay
        this._overlayRef = this._overlay.create({
            hasBackdrop     : true,
            backdropClass   : 'fuse-backdrop-on-mobile',
            scrollStrategy  : this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                                  .flexibleConnectedTo(this._notificationsOrigin._elementRef.nativeElement)
                                  .withLockedPosition(true)
                                  .withPush(true)
                                  .withPositions([
                                      {
                                          originX : 'start',
                                          originY : 'bottom',
                                          overlayX: 'start',
                                          overlayY: 'top'
                                      },
                                      {
                                          originX : 'start',
                                          originY : 'top',
                                          overlayX: 'start',
                                          overlayY: 'bottom'
                                      },
                                      {
                                          originX : 'end',
                                          originY : 'bottom',
                                          overlayX: 'end',
                                          overlayY: 'top'
                                      },
                                      {
                                          originX : 'end',
                                          originY : 'top',
                                          overlayX: 'end',
                                          overlayY: 'bottom'
                                      }
                                  ])
        });

        // Detach the overlay from the portal on backdrop click
        this._overlayRef.backdropClick().subscribe(() => {
            this._overlayRef.detach();
        });
    }

    /**
     * Calculate the unread count
     *
     * @private
     */
    private _calculateUnreadCount(): void {
        let count = 0;
        if (this.notifications && this.notifications.length) {
          count = this.notifications.filter(notification => !notification.isSeen).length;
        }
        this.unreadCount.next(count);
      }



    connect(): void {
        this.websocketService.connect();
        this.notificationSubscription =    this.notificationService.notificationMessage.subscribe((message) => {
          console.log('message',message);
         
       
          this.notificationService.getNotificationBySenderIdAndNotificationId(message.id,message.sender.id).subscribe({
            next:(res:any)=>{
                    
        res.forEach(element => {
        
          console.log(element+"testtest")
          if(element.receiverEmail === this.user.email){
         
          this._notificationsService.getAll().subscribe({
            next : (res:any)=>{
                this.notifications =res ;
                this._changeDetectorRef.markForCheck();
            }
          })
             
       // this._calculateUnreadCount(); (error t3awedlk f notification akther men marra )
        
        
            if(message.type ==='INFO'){
            
        //     this.ngxNotificationMsgService.open({
        //       status: NgxNotificationStatusMsg.INFO,
        //       direction: NgxNotificationDirection.BOTTOM_RIGHT,
        //       header: message.title,
        //       messages: [message.content],
        //      closeable:true,
        //      displayProgressBar:true,
        //      delay :7000,
        //      displayIcon:true,
           
        //   }
        //     )
        this.toastr.info(  message.title,'INFO',{
            timeOut: 7000});

          
            }else{
                // this.ngxNotificationMsgService.open({
                //     status: NgxNotificationStatusMsg.FAILURE,
                //     direction: NgxNotificationDirection.BOTTOM_RIGHT,
                //     header: message.title,
                //     messages: [message.content],
                //    closeable:true,
                //    displayProgressBar:true,
                //    delay :7000,
                //    displayIcon:true,
                 
                // });
                this.toastr.error( message.title,'WARN',  {
                    timeOut: 7000});

            }
        
      
    
          }
          
        });
          
           
          }})
        
        });
      }
    
      disconnect(): void {
        this.websocketService.disconnect();
    
      }
    
    
    
      notify(message: any): void {
   
   
    }
      
    
    
    

}
