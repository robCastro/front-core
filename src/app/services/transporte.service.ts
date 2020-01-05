import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as url from './url_back';

import { Transporte } from '../models/transporte';

@Injectable({
  providedIn: 'root'
})
export class TransporteService {

	private urlBase = url.produccion;

	constructor(
		private http: HttpClient,
	) { }

	public getTransporte(placa: string): Observable<Transporte>{
		return this.http.get(`${this.urlBase}transporte?placa=${placa}`) as Observable<Transporte>;
	}
}
