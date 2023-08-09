import { HttpClient } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable } from 'rxjs/internal/Observable';
import { AppNotification } from '../model/app-notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notificationMessage = new EventEmitter();
  chatMessage = new EventEmitter();
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<AppNotification[]> {
    return this.http.get<AppNotification[]>(this.host+'/notification/notifications');
  }


  deleteNotification(id:any){
    return this.http.delete<AppNotification[]>(this.host+'/notification/delete/'+id);
  }

  getNotificationById(id:any): Observable<any> {
    return this.http.get<any>(this.host+'/notification/get/'+id);
  }

  getNotificationBySenderIdAndNotificationId(notificationId:any , senderId:any){
  return this.http.get<any>(this.host+'/userNotification/notifications/User/'+senderId+'/'+notificationId);
}

getUserNotificationById(id:any): Observable<any> {
  return this.http.get<any>(this.host+'/userNotification/notifications/get/'+id);
}

sendNotification( id:any, title: any, content: any, type: any, emailList: any) {
  const notification = { title, content, type };
  const data = { notification, emailList };
  
  return this.http.post(this.host+'/notification/send/'+id, data );
}

updateNotification(notificationId:any,title: any, content: any, type: any, emailList: any){
  const notification = { title, content, type };
  const data = { notification, emailList };
  
  return this.http.put(this.host+'/notification/update/'+notificationId, data );
}

}
