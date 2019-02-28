export class Almacen{
    constructor(
        public id:number,
        public requisicion_id:number,
        public proveedor_id:number,
        public articulo_id:number,
        public codigo:string,
        public cantidad:number,
        public precio:number,
        public inpuesto:number,
        public total:number
    ){}
}