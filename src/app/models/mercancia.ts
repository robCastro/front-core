import { TipoMercancia } from './tipo-mercancia';
import { Responsable as Envia } from './responsable';
import { Responsable as Recibe } from './responsable';


export class Mercancia {
	id_mercancia:number;
	tipo_mercancia: TipoMercancia;
	envia: Envia;
	recibe: Recibe;
	descripcion_mercancia: string;
	cantidad_mercancia: number;
	valor_mercancia: number;
	seguro_mercancia: number;
	flete_mercancia: number;
}
