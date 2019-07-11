export class User{
    constructor(
        public id: number,
        public personal_id: number,
        public puesto_id: number,
        public username: string,
        public email: string,
        public role: string,
        public name: string,
        public surname: string,
        public password: string,
        public decpassword: string
    ){}

}//END CLASS