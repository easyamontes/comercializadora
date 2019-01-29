export class Contacto{
    constructor(
        public personal_id: string,
        public proveedor_id: string,
        public nombre:string,
        public tipo: string,
        public numero: number
    ){}
}