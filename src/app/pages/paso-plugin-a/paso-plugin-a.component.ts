import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import Swal from 'sweetalert2';

import { MercanciaService } from '../../services/mercancia.service';
import { TransporteService } from '../../services/transporte.service';
import { IvaService } from '../../services/plugin_a/iva.service';
import { ArancelService } from '../../services/plugin_a/arancel.service';
import { AduanaService } from '../../services/plugin_a/aduana.service';
import { PasaService } from '../../services/plugin_a/pasa.service';

import { Mercancia } from '../../models/mercancia';
import { Transporte } from '../../models/transporte';
import { Iva } from '../../models/plugin_a/iva';
import { Arancel } from '../../models/plugin_a/arancel';
import { Aduana } from '../../models/plugin_a/aduana';
import { Pasa } from '../../models/plugin_a/pasa';

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
	public arancel: Arancel;
	public aduana: Aduana;
	public pasa: Pasa;


	public cif: number;
	public tasaArancel: number;
	public pagoArancel: number = null;
	public pagoIva: number = null;
	public multa: number = 0;



	constructor(
		private mercanciaService: MercanciaService,
		private route: ActivatedRoute,
		private transporteService: TransporteService,
		private ivaService: IvaService,
		private arancelService: ArancelService,
		private aduanaService: AduanaService,
		private pasaService: PasaService
	) { }

	ngOnInit() {
		this.displayProcesando(true);
		this.route.queryParamMap.subscribe(params => {
			let id_aduana:number = parseInt(params.get('id_aduana'));
			this.aduanaService.getAduana(id_aduana).subscribe(
				aduana => {
					this.aduana = aduana;
					console.log(aduana);
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
				},
				error => {
					this.displayError(error);
					this.aduana = null;
				}
			);
		});
					
	}

	public buscarMercancia(){
		this.displayProcesando(true);
		this.mercanciaService.getMercancia(this.id_mercancia, true).subscribe(
			mercancia => {
				this.mercancia = mercancia;
				console.log(this.mercancia);
				this.arancelService.getArancel(this.mercancia.tipo_mercancium.id_tipo_mercancia).subscribe(
					arancel => {
						this.arancel = arancel;
						this.displayProcesando(false);
						console.log(this.arancel);
						this.pagoArancel = this.calcularPago();
						this.pagoIva = this.iva.tasa_iva * this.cif;
					},
					error => {
						this.displayError(error);
						this.mercancia = null;
						this.arancel = null;
						this.tasaArancel = null;
						this.pagoArancel = null;
						this.pagoIva = null;
					}
				)
			},
			error => {
				this.displayError(error);
				this.mercancia = null;
				this.pagoIva = null;
			}
		)
	}

	public calcularPago(): number{
		let retorno: number = null;
		if(this.mercancia !== null && this.arancel !== null && this.aduana !== null){
			this.cif = this.mercancia.flete_mercancia*1.0 + this.mercancia.seguro_mercancia*1.0 + this.mercancia.valor_mercancia*1.0;
			this.mercancia.recibe.pais.id_pais === this.aduana.id_pais ? this.tasaArancel = this.arancel.tasa_entrada_arancel*1.0 : this.tasaArancel = this.arancel.tasa_paso_arancel*1.0;
			retorno = this.cif * this.tasaArancel;
		}
		return retorno;
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

	public guardarPaso(){
		this.displayProcesando(true);
		if (this.mercancia == null){
			this.displayError({error: {msg: 'Busque la mercancia'}});
			return;
		}
		if (this.transporte == null){
			this.displayError({error: {msg: 'Busque el transporte'}});
			return;
		}
		this.pasa = new Pasa();
		this.pasa.aduana = this.aduana;
		this.pasa.iva = this.iva;
		this.pasa.arancel = this.arancel;
		this.pasa.id_transporte = this.transporte[0].id_transporte;
		this.pasa.id_mercancia = this.mercancia.id_mercancia;
		this.pasa.multa_pasa = this.multa;
		this.pasa.retenida_pasa = false;
		this.pasaService.postPasa(this.pasa).subscribe(
			pasa => {
				Swal.fire({
					title: 'Guardado!',
					text: 'Paso guardado',
					icon: 'success',
					showConfirmButton: false,
					allowOutsideClick: false,
	  				allowEscapeKey: false,
					timer: 3000,
					timerProgressBar: true
				});
				this.pasa = null;
				this.aduana = null;
				this.iva = null;
				this.arancel = null;
				this.transporte = null;
				this.mercancia = null;
				this.multa = 0;
			},
			error => {
				this.displayError(error);
				this.pasa = null;
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
