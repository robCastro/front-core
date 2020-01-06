import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as url from './url_back';


import { Pasa } from '../../models/plugin_a/pasa';

@Injectable({
  providedIn: 'root'
})
export class PasaService {

	private urlBase = url.desarrollo;

	constructor(
		private http: HttpClient,
	) { }


	public postPasa(pasa: Pasa): Observable<Pasa>{
		return this.http.post(`${this.urlBase}pasa`, pasa) as Observable<Pasa>;
	}
}
