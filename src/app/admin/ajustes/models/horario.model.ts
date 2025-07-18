export class HorarioModel {
  id!: number;
  dia_semana!: number;           // 0 = Domingo, 6 = Sábado
  abre_desde!: string;           // '08:00:00'
  cierra_hasta!: string;         // '20:00:00'
  activo!: boolean | number;     // 1 o 0 del backend, booleano en UI
  cliente_id!: number;
}