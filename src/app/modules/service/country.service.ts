import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Country } from '../model/country';
import { environment } from 'environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CountryService {
	private host = environment.apiUrl;

	constructor(private httpClient: HttpClient) { }

	getCountryList(): Observable<Country[] | HttpErrorResponse> {
		return this.httpClient.get<Country[] | HttpErrorResponse>(`${this.host}/countries`);
	}
}
