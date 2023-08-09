import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Group } from '../model/group';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getGroupss(): Observable<Group[]> {
    return this.http.get<Group[]>(this.host+'/group');
  }
  getGroupstByDepartmentId(id:any): Observable<any> {
    return this.http.get<any>(this.host+'/group/Department/'+id);
  }

  getGroupById(id: any): Observable<Group> {
    const url = `${this.host}/group/${id}`;
    return this.http.get<Group>(url);
  }

  createGroup(group: Group , idDepartment:any): Observable<Group> {
    return this.http.post<Group>(this.host+'/group/Department/'+idDepartment, group );
  }

  updateGroup(id: any, group: Group): Observable<Group> {
    const url = `${this.host}/group/${id}`;
    return this.http.put<Group>(url, group);
  }

  deleteGroup(id: number): Observable<void> {
    const url = `${this.host}/group/${id}`;
    return this.http.delete<void>(url);
  }



  assighUserToGroup(groupId: number, email: string) {
    const url = `${this.host}/group/${groupId}/UserGroup`;
    const params = new HttpParams().set('email', email);
    return this.http.post(url, null, { params });
  }


  deleteUserToGroup(id: number): Observable<void> {
    const url = `${this.host}/group/UserGroup/${id}`;
    return this.http.delete<void>(url);
  }
}
