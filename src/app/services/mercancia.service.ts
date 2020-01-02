import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as url from './url_back';


import { Mercancia } from '../models/mercancia';
import { Detalle } from '../models/detalle';

@Injectable({
  providedIn: 'root'
})
export class MercanciaService {

	private urlBase = url.produccion;


	constructor(
		private http: HttpClient,
	) { }

	public getMercancia(id_mercancia: number): Observable<Mercancia>{
		return this.http.get(`${this.urlBase}mercancia/${id_mercancia}`) as Observable<Mercancia>;
	}

	public getDetalles(id_mercancia: number): Observable<any>{
		return this.http.get(`${this.urlBase}mercancia/${id_mercancia}/detalles`) as Observable<any>;
	}
}
