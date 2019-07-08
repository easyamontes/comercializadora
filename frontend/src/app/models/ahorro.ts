export class Ahorro{
    constructor(
        public id:number,
        public limiteahorro:number,
        public nombre:string,
        public fechapago:string,  
        public montopagado:number,
        public personal_id:number,
        public status:string    
    ){}
}