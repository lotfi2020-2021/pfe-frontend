import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, switchMap, take, tap } from 'rxjs';
import { Notification } from 'app/layout/common/notifications/notifications.types';
import { AuthService } from 'app/modules/service/auth.service';
import { environment } from 'environments/environment.development';
import { UserService } from 'app/modules/service/user.service';

@Injectable({
    providedIn: 'root'
})
export class NotificationsService
{

    user:any
    authUser:any
     private host = environment.apiUrl;
    private _notifications: ReplaySubject<any> = new ReplaySubject<any>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient, private authService :AuthService,private userService: UserService)
    {
        this.authUser = this.authService.getAuthUserFromCache();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for notifications
     */
    get notifications$(): Observable<any>
    {
        return this._notifications.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all notifications
     */
    getAll(): Observable<any>
    {
        return this._httpClient.get<any>(this.host+'/userNotification/notifications/'+this.authUser.id).pipe(
            tap((notifications) => {
                this._notifications.next(notifications.reverse());

                notifications.forEach((el:any)=>{

                    this.userService.getUserById(el.notification.sender.id).subscribe({
                        next:(res:any)=>{

                            this.user = res
                            console.log(res+"rtrtrtrtrtrtrt")
                        }
                    })
                })
            })
        );
    }

    /**
     * Create a notification
     *
     * @param notification
     */
    create(notification: Notification): Observable<Notification>
    {
        return this.notifications$.pipe(
            take(1),
            switchMap(notifications => this._httpClient.post<Notification>('api/common/notifications', {notification}).pipe(
                map((newNotification) => {

                    // Update the notifications with the new notification
                    this._notifications.next([...notifications, newNotification]);

                    // Return the new notification from observable
                    return newNotification;
                })
            ))
        );
    }

    /**
     * Update the notification
     *
     * @param id
     * @param notification
     */
    update(id: string, notification: Notification): Observable<Notification>
    {
        return this.notifications$.pipe(
            take(1),
            switchMap(notifications => this._httpClient.get<Notification>(this.host+'/userNotification/notifications/read/'+id).pipe(
                map((updatedNotification: Notification) => {

                    // Find the index of the updated notification
                    const index = notifications.findIndex(item => item.id === id);

                    // Update the notification
                    notifications[index] = updatedNotification;

                    // Update the notifications
                    this._notifications.next(notifications);

                    // Return the updated notification
                    return updatedNotification;
                })
            ))
        );
    }

    /**
     * Delete the notification
     *
     * @param id
     */
    delete(id: string): Observable<boolean>
    {
        return this.notifications$.pipe(
            take(1),
            switchMap(notifications => this._httpClient.delete<boolean>(this.host+'/userNotification/delete/'+id).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted notification
                    const index = notifications.findIndex(item => item.id === id);

                    // Delete the notification
                    notifications.splice(index, 1);

                    // Update the notifications
                    this._notifications.next(notifications);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

    /**
     * Mark all notifications as read
     */
    markAllAsRead(): Observable<boolean>
    {
        return this.notifications$.pipe(
            take(1),
            switchMap(notifications => this._httpClient.get<boolean>(this.host+'/userNotification/notifications/mark-seen/'+this.authUser.id).pipe(
                map((isUpdated: boolean) => {

                    // Go through all notifications and set them as read
                    notifications.forEach((notification, index) => {
                        notifications[index].isSeen = true;
                    });

                    // Update the notifications
                    this._notifications.next(notifications);

                    // Return the updated status
                    return isUpdated;
                })
            ))
        );
    }
}
