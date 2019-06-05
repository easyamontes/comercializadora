export class Almacen{
    constructor(
        public id:number,
        public id_almacen:number,
        public userp_id:number,
        public requisicion_id:number,
        public proveedor_id:number,
        public articulo_id:number,
        public pedido_id:number,
        public folio:number,
        public tipo:string,
        public codigo:string,
        public articulo:string,
        public marca:string,
        public modelo:string,
        public cantidad:number,
        public costo:number,
        public precio:number,
        public existencia:number,
        public recepcion:number,
        public venta:number,
        public devolucion:number,
        public total:number,
        public totalExistencia:number
    ){}
}