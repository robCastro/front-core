import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';

import { MercanciaService } from '../../services/mercancia.service';
import { SocketService } from '../../services/socket.service';

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
		private socketService: SocketService,
	) { }

	ngOnInit() {
		
		this.route.queryParamMap.subscribe(params => {
			let id_mercancia:number = parseInt(params.get('id_mercancia'));
			this.mercanciaService.getMercancia(id_mercancia).subscribe(
				mercancia => {
					this.mercancia = mercancia;
					this.isMercanciaLoaded = true;
				}, err => {
					this.displayError(err);
					this.mercancia = null;
				}
			);
			this.mercanciaService.getDetalles(id_mercancia).subscribe(
				respuesta => {
					this.detalles = respuesta.detalles;
					this.isDetallesLoaded = true;
					console.log('Errores: ', respuesta.errores);
					if(respuesta.errores)
						this.displayError({error: {msg: respuesta.errores}});
					console.log(this.detalles);
				}, error => {
					this.displayError(error);
				}
			);
			this.socketService.listen('nuevo_detalle').subscribe((id_mercancia: number) => {
				if(id_mercancia === this.mercancia.id_mercancia){
					Swal.fire({
						title: 'Actualizando!',
						text: 'Nuevo Paso detectado, actualizando',
						icon: 'info',
						position: 'bottom-end',
						showConfirmButton: false,
						timer: 2000
					});
					this.mercanciaService.getDetalles(id_mercancia).subscribe(
						respuesta => {
							this.detalles = respuesta.detalles;
							this.isDetallesLoaded = true;
							console.log('Errores: ', respuesta.errores);
							Swal.fire({
								title: 'Actualizado!',
								text: 'Se han añadido nuevos pasos',
								icon: 'success',
								position: 'bottom-end',
								showConfirmButton: false,
								timer: 2000
							});
							if(respuesta.errores)
								this.displayError({error: {msg: respuesta.errores}});
							console.log(this.detalles);
						}, error => {
							this.displayError(error);
						}
					);
				}
			});
		});

	}

	private displayError(err: any){
		console.log(err);
		let msg = "";
		err.error.msg ? msg = err.error.msg : msg = err.message;
		console.log(msg);
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
