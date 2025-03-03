export interface Product {
    id?: string;          
    nombre: string;
    descripcion: string;
    precio: number;
    descuento: boolean;
    porcentajeDescuento?: number;
    imagenUrl: string;
  }
  