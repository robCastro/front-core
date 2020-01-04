import { ConversionDolar } from './conversion-dolar';
export class Arancel {
	id_arancel:number;
	tasa_entrada_arancel:number;
	tasa_paso_arancel:number;
	fecha_arancel: Date;
	activo_arancel:boolean;
	id_pais: number;
	id_tipo_mercancia: number;
	converion_dolar:ConversionDolar;
}
