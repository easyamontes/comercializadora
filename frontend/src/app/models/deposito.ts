import { Banco } from "./banco";
import { Requisicion } from "./requisicion";

export class Deposito{
    constructor(
        public id: number,
        public user_id:number,
        public banco_id:number,
        public requisicion_id:number,
        public importe:number,
        public transferencia:string,
        public comentarios:string,
        public status:string,
        public ftransferencia:string,
        public fventa:string,
        //Relaciones
        public banco:Banco,
        public requisicion:Requisicion
    ){
    }
}