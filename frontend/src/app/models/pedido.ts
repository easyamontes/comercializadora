export class Pedido{
    constructor(
        public id:number,
        public fechapedido:string,
        public importe:number,
        public pdestino:number,
        public nombre:string,
        public tipo:string,
        public premio:string,
        public semana:number,
        public dia:string,
    ){}

}//End Class