import { Iva } from './iva';
import { Arancel } from './arancel';
import { Aduana } from './aduana';

export class Pasa {
	id_pasa:number;
	id_fecha_pasa: Date;
	retenida_pasa: boolean;
	multa_pasa: number;
	id_transporte:number;
	id_mercancia:number;
	iva:Iva;
	arancel:Arancel;
	aduana:Aduana;
}
