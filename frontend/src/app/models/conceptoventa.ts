export class Conceptoventa{
    constructor(
        public id: number,
        public pedido_id: number,
        public proveedor_id: number,
        public articulo_id: number,
        public codigo:string,
        public articulo: string,
        public marca: string,
        public modelo: string,
        public cantidad: number,
        public precio: number,
        public existencia: number,
        public precioventa: number,
        public impuesto: number,
        public total: number,
    ){}
}