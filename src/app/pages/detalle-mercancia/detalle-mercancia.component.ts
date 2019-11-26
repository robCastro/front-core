import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { MercanciaService } from '../../services/mercancia.service';

import { Mercancia } from '../../models/mercancia';
import { Detalle } from '../../models/detalle';

@Component({
  selector: 'app-detalle-mercancia',
  templateUrl: './detalle-mercancia.component.html',
  styleUrls: ['./detalle-mercancia.component.scss']
})
export class DetalleMercanciaComponent implements OnInit {

	public isMercanciaLoaded:boolean = false;
	public isDetallesLoaded:boolean = false;
	public mercancia: Mercancia = new Mercancia();
	public detalles: Detalle[];

	constructor(
		private mercanciaService: MercanciaService,
		private route: ActivatedRoute,
	) { }

	ngOnInit() {
		
		this.route.queryParamMap.subscribe(params => {
			let id_mercancia:number = parseInt(params.get('id_mercancia'));
			this.mercanciaService.getMercancia(id_mercancia).subscribe(mercancia => {
				this.mercancia = mercancia;
				this.isMercanciaLoaded = true;
			});
			this.mercanciaService.getDetalles(id_mercancia).subscribe(respuesta => {
				this.detalles = respuesta.detalles;
				this.isDetallesLoaded = true;
				// Aqui mismo display de errores que vienen con respuesta
				console.log(this.detalles);
			});
		});

	}

}
