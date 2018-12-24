import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { PuestoService } from '../../services/puesto.service';
import { Puesto } from 'src/app/models/puesto';

@Component({
    selector: 'puesto',
    templateUrl: './puesto-edit.component.html',
    providers: [
        UserService,
        PuestoService, 
    ]
})

export class PuestoEditComponent implements OnInit{
    public title: string;
    public user: User;
    public status: string;
    public token;
    public puestos: Array<Puesto>;

    constructor(
        private _UserService: UserService,
        private _PuestoService: PuestoService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.title = 'Puesto';
        this.token = _UserService.getToken();
    }

    ngOnInit(){

    }



}//end Class