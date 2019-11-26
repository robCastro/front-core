import { Marca } from './marca';
import { Pais } from './pais';

export class Transporte {
	id_transporte:number;
	pais: Pais;
	marca: Marca;
	placa_transporte: string;
	modelo_transporte: string;
	activo_transporte: boolean;

}
