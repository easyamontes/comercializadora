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
        public fehca:Date,
        public factura:string,
        public ffactura:Date,
        public divisa:string
        
    ){}
}