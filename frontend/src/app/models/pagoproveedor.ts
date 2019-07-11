export class PagoProveedor{
    constructor(
        public id:number,
        public proveedor_id:number,
        public factura:string,
        public fecha:string,
        public concepto:string,
        public importe:number,
        public iva:number,
        public total:number,
        public fpago:string,
        public status:string
    ){}
}//END CLASS