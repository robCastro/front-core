import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';

import { MercanciaService } from '../../services/mercancia.service';
import { TransporteService } from '../../services/transporte.service';
import { IvaService } from '../../services/plugin_a/iva.service';

import { Mercancia } from '../../models/mercancia';
import { Transporte } from '../../models/transporte';
import { Iva } from '../../models/plugin_a/iva';

@Component({
  selector: 'app-paso-plugin-a',
  templateUrl: './paso-plugin-a.component.html',
  styleUrls: ['./paso-plugin-a.component.scss']
})
export class PasoPluginAComponent implements OnInit {

	public mercancia: Mercancia;
	public transporte: Transporte;
	public id_mercancia: number;
	public placa: string;
	public iva: Iva;



	constructor(
		private mercanciaService: MercanciaService,
		private route: ActivatedRoute,
		private transporteService: TransporteService,
		private ivaService: IvaService
	) { }

	ngOnInit() {
		this.displayProcesando(true);
		this.ivaService.getIva().subscribe(
			iva => {
				this.iva = iva;
				this.displayProcesando(false);
			}, 
			err => {
				this.displayError(err);
				this.iva = null;
			}
		)
	}

	public buscarMercancia(){
		this.displayProcesando(true);
		this.mercanciaService.getMercancia(this.id_mercancia, true).subscribe(
			mercancia => {
				this.mercancia = mercancia;
				console.log(this.mercancia);
				this.displayProcesando(false);
			},
			error => {
				this.displayError(error);
				this.mercancia = null;
			}
		)
	}

	public buscarTransporte(){
		this.displayProcesando(true);
		this.transporteService.getTransporte(this.placa).subscribe(
			transporte => {
				this.transporte = transporte;
				console.log(this.transporte);
				this.displayProcesando(false);
			}, 
			error => {
				this.displayError(error);
				this.transporte = null;
			}
		)
	}

	private displayError(err: any){
		console.log(err);
		let msg = "";
		err.error.msg ? msg = err.error.msg : msg = err.message;
		Swal.fire({
			title: '<strong>Error!</strong>',
			html: msg,
			icon: 'error',
			confirmButtonText: 'OK'
		});
		
	}

	private displayProcesando(abrir: boolean){
		if(abrir){
			Swal.fire({
				position: 'top-end',
				title: 'Procesando',
				html: '...',
				icon: 'info',
				showConfirmButton: false,
				allowOutsideClick: false,
  				allowEscapeKey: false,
			});
		}
		else{
			Swal.close();
		}
	}


}
