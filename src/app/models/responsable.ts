import { Pais } from './pais';

export class Responsable {
	id_responsable: number;
	pais: Pais;
	nombres_responsable: string;
	apellidos_responsable: string;
	fecha_nac_responsable: Date;
	direccion_responsable: string;
	activo_responsable: boolean;
}