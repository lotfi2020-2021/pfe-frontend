import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { Department } from '../model/department';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.host+'/department');
  }
  getDepartmentByEntrepriseId(id:any): Observable<any> {
    return this.http.get<any>(this.host+'/department/User/'+id);
  }

  getDepartmentById(id: any): Observable<Department> {
    const url = `${this.host}/department/${id}`;
    return this.http.get<Department>(url);
  }

  createDepartment(department: Department , idUser:any): Observable<Department> {
    return this.http.post<Department>(this.host+'/department/'+idUser, department );
  }

  updateDepartment(id: any, room: Department): Observable<Department> {
    const url = `${this.host}/department/${id}`;
    return this.http.put<Department>(url, room);
  }

  deleteDepartment(id: number): Observable<void> {
    const url = `${this.host}/department/${id}`;
    return this.http.delete<void>(url);
  }
}
