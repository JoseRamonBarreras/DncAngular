export class EnvioModel {
  id!: number;
  tipo_envio_id!: number;          
  precio_fijo!: number;          
  permite_entrega_domicilio!: string;        
  permite_recoger_sucursal!: boolean | number;
  cliente_id!: number;
}