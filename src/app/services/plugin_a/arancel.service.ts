import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as url from './url_back';


import { Arancel } from '../../models/plugin_a/arancel';


@Injectable({
  providedIn: 'root'
})
export class ArancelService {

	private urlBase = url.produccion;
	
	constructor(
		private http: HttpClient,
	) { }

	public getArancel(id_tipo_mercancia: number): Observable<Arancel>{
		return this.http.get(`${this.urlBase}arancel/${id_tipo_mercancia}`) as Observable<Arancel>;
	}
}
