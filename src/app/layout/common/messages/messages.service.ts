import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, ReplaySubject, switchMap, take, tap } from 'rxjs';
import { Message } from 'app/layout/common/messages/messages.types';
import { environment } from 'environments/environment.development';
import { AuthService } from 'app/modules/service/auth.service';
import { WebsocketService } from 'app/modules/service/websocket.service';
import { NotificationService } from 'app/modules/service/notification.service';

@Injectable({
    providedIn: 'root'
})
export class MessagesService
{
    
    host = environment.apiUrl
    user:any
    private _messages: ReplaySubject<Message[]> = new ReplaySubject<Message[]>(1);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient , private authService :AuthService)
    {
        this.user =this.authService.getAuthUserFromCache()
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for messages
     */
    get messages$(): Observable<any[]>
    {
        return this._messages.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all messages
     */
    getAll(): Observable<any[]>
    {
        return this._httpClient.get<any[]>( this.host+'/chat/latest-messages/'+this.user.id).pipe(
            tap((messages) => {
                this._messages.next(messages);
            })
        );
    }

    /**
     * Create a message
     *
     * @param message
     */
    create(message: Message): Observable<Message>
    {
        return this.messages$.pipe(
            take(1),
            switchMap(messages => this._httpClient.post<Message>('api/common/messages', {message}).pipe(
                map((newMessage) => {

                    // Update the messages with the new message
                    this._messages.next([...messages, newMessage]);

                    // Return the new message from observable
                    return newMessage;
                })
            ))
        );
    }

    /**
     * Update the message
     *
     * @param id
     * @param message
     */
    update(id: string, message: Message): Observable<Message>
    {
        return this.messages$.pipe(
            take(1),
            switchMap(messages => this._httpClient.patch<Message>('api/common/messages', {
                id,
                message
            }).pipe(
                map((updatedMessage: Message) => {

                    // Find the index of the updated message
                    const index = messages.findIndex(item => item.id === id);

                    // Update the message
                    messages[index] = updatedMessage;

                    // Update the messages
                    this._messages.next(messages);

                    // Return the updated message
                    return updatedMessage;
                })
            ))
        );
    }

    /**
     * Delete the message
     *
     * @param id
     */
    delete(id: string): Observable<boolean>
    {
        return this.messages$.pipe(
            take(1),
            switchMap(messages => this._httpClient.delete<boolean>('api/common/messages', {params: {id}}).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted message
                    const index = messages.findIndex(item => item.id === id);

                    // Delete the message
                    messages.splice(index, 1);

                    // Update the messages
                    this._messages.next(messages);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

    /**
     * Mark all messages as read
     */
    markAllAsRead(): Observable<boolean>
    {
      
        return this.messages$.pipe(
            take(1),
            switchMap(messages => this._httpClient.post<any>(this.host+'/chat/mark-as-seen/'+this.user.id,null).pipe(
                map((isUpdated: boolean) => {

                    // Go through all messages and set them as read
                    messages.forEach((message, index) => {
                        messages[index].isRead = true;
                    });

                    // Update the messages
                    this._messages.next(messages);

                    // Return the updated status
                    return isUpdated;
                })
            ))
        );
    }


    


}
