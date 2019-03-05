export class Requisicion{
    constructor(
        public id:number,
        public porigen_id:number,
        public pdestino_id:number,
        public proveedor_id:number,
        public folio:number,
        public tipo:string,
        public status:string,
        public importe:number,
        public fecha:string,
        public factura:string,
        public ffactura:string,
        public divisa:string
        
    ){}
}