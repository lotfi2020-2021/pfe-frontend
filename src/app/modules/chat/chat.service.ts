import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, filter, map, Observable, of, switchMap, take, tap, throwError } from 'rxjs';
import { Chat, Contact, Profile } from './chat.types';
import { environment } from 'environments/environment.development';
import { AuthService } from '../service/auth.service';



@Injectable({
    providedIn: 'root'
})
export class ChatService
{   messages:any
    user:any ;
  private host = environment.apiUrl;
    private _chat: BehaviorSubject<Chat> = new BehaviorSubject(null);
    private _chats: BehaviorSubject<any> = new BehaviorSubject(null);
    private _contact: BehaviorSubject<any> = new BehaviorSubject(null);
    private _contacts: BehaviorSubject<any> = new BehaviorSubject(null);
    private _profile: BehaviorSubject<any> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient , private authService :AuthService )
    {

     this.user =   this.authService.getAuthUserFromCache()
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for chat
     */
    get chat$(): Observable<Chat>
    {
        return this._chat.asObservable();
    }

    /**
     * Getter for chats
     */
    get chats$(): Observable<any>
    {
        return this._chats.asObservable();
    }

    /**
     * Getter for contact
     */
    get contact$(): Observable<any>
    {
        return this._contact.asObservable();
    }

    /**
     * Getter for contacts
     */
    get contacts$(): Observable<any>
    {
        return this._contacts.asObservable();
    }

    /**
     * Getter for profile
     */
    get profile$(): Observable<any>
    {
        return this._profile.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get chats
     */
    getChats(userid :any): Observable<any>
    {
        console.log(this.user.id +"userIDID")
        return this._httpClient.get<any>(this.host+'/chat/latest-messages/'+userid).pipe(
            
            tap((response: any) => {
              this.messages = response.map((chat: any) => {
                // if (chat.recieverId === userid) {
                //   return {
                //     body: chat.body,
                //     recieverId: chat.senderId,
                //     senderId: chat.recieverId,
                //     photoReceiver: chat.photoSender,
                //     photoSender: chat.photoReceiver,
                //     userNameReceiver: chat.userNameSender,
                //     userNameSender: chat.userNameReceiver,
                //     chatroomId: chat.chatroomId,
                //     isRead: chat.isRead,
                //     created: chat.created,
                //   };
                // } else {
                //   return chat;
                // }
                
              });
             
              this._chats.next(this.messages);
              
           
            })
          );
        }

    /**
     * Get contact
     *
     * @param id
     */
    getContact(id: string): Observable<any>
    {
        return this._httpClient.get<Contact>('api/apps/chat/contacts', {params: {id}}).pipe(
            tap((response: Contact) => {
                this._contact.next(response);
            })
        );
    }

    /**
     * Get contacts
     */
    getContacts(): Observable<any>
    {
        return this._httpClient.get<any>(this.host+'/listUserWithoutChatroom/'+ this.user.id +'/'+this.user.entrepriseId).pipe(
            tap((response: any) => {
                this._contacts.next(response);
            })
        );
    }

    /**
     * Get profile
     */
    getProfile(): Observable<any>
    {
        return this._httpClient.get<any>(this.host+'/users/'+this.user.id).pipe(
            tap((response: any) => {
                this._profile.next(response);
            })
        );
    }

    /**
     * Get chat
     *
     * @param id
     */
    getChatById(id: any): Observable<any>
    {
       
        return this._httpClient.get<any>(this.host+'/chat/'+this.user.id+'/'+id).pipe(
            map((chat) => {

                // Update the chat
                this._chat.next(chat);

                // Return the chat
                return chat;
            }),
            switchMap((chat) => {

                if ( !chat )
                {
                    return throwError('Could not found chat with id of ' + id + '!');
                }

                return of(chat);
            })
        );
    }

    /**
     * Update chat
     *
     * @param id
     * @param chat
     */
    updateChat(id: string, chat: Chat): Observable<Chat>
    {
        return this.chats$.pipe(
            take(1),
            switchMap(chats => this._httpClient.patch<Chat>('api/apps/chat/chat', {
                id,
                chat
            }).pipe(
                map((updatedChat) => {

                    // Find the index of the updated chat
                    const index = chats.findIndex(item => item.id === id);

                    // Update the chat
                    chats[index] = updatedChat;

                    // Update the chats
                    this._chats.next(chats);

                    // Return the updated contact
                    return updatedChat;
                }),
                switchMap(updatedChat => this.chat$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {

                        // Update the chat if it's selected
                        this._chat.next(updatedChat);

                        // Return the updated chat
                        return updatedChat;
                    })
                ))
            ))
        );
    }

    /**
     * Reset the selected chat
     */
    resetChat(): void
    {
        this._chat.next(null);
    }

   


    sendMessage(message: any, receiverId: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
          }
          const chatMessage={
            body:message
          }
        return this._httpClient.post(this.host+'/chatroom/chat/'+this.user.id +'/'+receiverId ,chatMessage,httpOptions);
        
      }




      createChatroom( receiverId: any): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
          }
          const chatMessage={
            body:''
          }
       
        return this._httpClient.post(this.host+'/chatroom/chat/'+this.user.id +'/'+receiverId ,chatMessage,httpOptions);
      }




      
}
