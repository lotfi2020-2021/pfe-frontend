import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GoogleCalenderService {


  constructor( private http :HttpClient ) { }

  getCalenders(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/Oauth2/Calenders').pipe(
      catchError(error => {
        if (error.status === 500) {
          window.location.href = 'http://localhost:8080/api/Oauth2/login/google';
        }
        return of(error);
      })
    );
  }


 deleteCalender(calendarId:any): Observable<any> {
    return this.http.delete<any>('http://localhost:8080/api/Oauth2/Calender/delete/'+calendarId);
  }
  
  getCalenderById( id :any): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/Oauth2/Calender/'+id);
  }

  createAgenda( agenda :any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/Oauth2/Calender/create',agenda);
  }
 
  updateAgenda(id:any,agenda:any): Observable<any> {
    return this.http.put<any>('http://localhost:8080/api/Oauth2/Calender/update/'+id,agenda);
  }
 
  getevents(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/Oauth2/events');
  }

  geteventsByCalender(id:any): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/Oauth2/events/Calender/'+id);
  }

  geteventBaseById(id:any): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/Oauth2/eventsBase/'+id);
  }

  geteventById(id:any): Observable<any> {
    return this.http.get<any>('http://localhost:8080/api/Oauth2/events/'+id);
  }
  
  updateEvent(id:any , event1:any): Observable<any> {
    return this.http.put<any>('http://localhost:8080/api/Oauth2/events/update/'+id ,event1 );
  }

  
  deleteEvent(eventId:any): Observable<any> {
    return this.http.delete<any>('http://localhost:8080/api/Oauth2/events/delete/'+eventId);
  }
  


  createEvent(event:any ,id :any){
    return this.http.post<any>('http://localhost:8080/api/Oauth2/events/create/'+id , event);
  }

 getColors(){
  return this.http.get<any>('http://localhost:8080/api/Oauth2/events/colors');
 }

 getAccesstokenGoogle(code: string): Observable<any> {
  const url = 'http://localhost:8080/api/login/google?code=' + code;
  return this.http.get(url);
 }
}
