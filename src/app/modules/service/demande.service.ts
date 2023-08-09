import { Injectable } from '@angular/core';

import { HttpClient , HttpParams } from '@angular/common/http';
import { Demande } from '../model/demande';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getDemandes(): Observable<Demande[]> {
    return this.http.get<Demande[]>(this.host+'/demande');
  }

  getDemandeById(id: any): Observable<Demande> {
    const url = `${this.host}/demande/${id}`;
    return this.http.get<Demande>(url);
  }

  createDemande(demande: Demande): Observable<Demande> {
    const url = `${this.host}/demande/create`;
    return this.http.post<Demande>(url, demande);
  }

s
  deleteDemande(id: number): Observable<void> {
    const url = `${this.host}/demande/delete/${id}`;
    return this.http.delete<void>(url);
  }

  updateDemande(id: number): Observable<void> {
    const url = `${this.host}/demande/update/${id}`;
    return this.http.put<void>(url ,{});
  }


}
