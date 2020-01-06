import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as url from './url_back';


import { Aduana } from '../../models/plugin_a/aduana';

@Injectable({
  providedIn: 'root'
})
export class AduanaService {

	private urlBase = url.produccion;

	constructor(
		private http: HttpClient,
	) { }

	public getAduana(id_aduana: number): Observable<Aduana>{
		return this.http.get(`${this.urlBase}aduana/${id_aduana}`) as Observable<Aduana>;
	}
}
