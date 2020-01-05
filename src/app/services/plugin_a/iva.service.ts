import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as url from './url_back';


import { Iva } from '../../models/plugin_a/iva';

@Injectable({
  providedIn: 'root'
})
export class IvaService {

	private urlBase = url.produccion;

	constructor(
		private http: HttpClient,
	) { }

	public getIva(): Observable<Iva>{
		return this.http.get(`${this.urlBase}iva`) as Observable<Iva>;
	}
}
