import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Personal } from './../../../models/personal';
import { User } from './../../../models/user';
import { UserService } from '../../../services/user.service';
import { GeneralCallService } from '../../../services/generalCall.service';

@Component({
    selector: 'personal-register',
    templateUrl: './register.component.html',
    providers:[
        UserService,
        GeneralCallService
    ]
})

export class PersonalRegisterComponent implements OnInit{
    public title:string;
    public status: string;
    public token: any;
    // obteneiendo objeto persona del componente edit component
    @Input() persona: Personal;
    
    public user: User;
    public email: any;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService :GeneralCallService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.title = 'Editando';
        this.token = _UserService.getToken();
        this.user = new User(0,'','','','','');
    }
    /** Buscando usuario al entrar al componente */
    ngOnInit(){
        let pas = '{"email":"'+this.persona.email+'"}';
        this.email = JSON.parse(pas);
        this._UserService.getUser(this.token,this.email).subscribe(
            response=>{
                this.user = response.user;
            },error=>{
                console.log("error")
            });
    }
    /**Creando usuario */
    makeUser(){
        this.user.email = this.persona.email;
        this.user.name = this.persona.nombre
        this.user.surname = this.persona.apellidop
        this._UserService.register(this.user).subscribe(
            response =>{
                this.status = response.status;
            },error=>{
                console.log(<any>error);
            });
    }
    

}
