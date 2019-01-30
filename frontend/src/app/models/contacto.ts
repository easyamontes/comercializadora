export class Contacto{
    constructor(
        public id: number,
        public personal_id: number,
        public proveedor_id: number,
        public nombre:string,
        public tipo: string,
        public numero: number
    ){}
}