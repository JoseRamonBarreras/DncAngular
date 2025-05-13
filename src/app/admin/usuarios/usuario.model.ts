export class UsuarioModel {
    id!: number;
    nombre!: string;
    correo!: string;
    password!: string;
    rol!: string;
    favorite_pet!: string;
    phone?: string;
    address?: string;
}