import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../../services/user.service';
import { PuestoService } from '../services/puesto.service';
import { Puesto } from 'src/app/models/puesto';

@Component({
    selector: 'puestos',
    templateUrl: './puesto-view.component.html',
    providers: [
        UserService,
        PuestoService, 
    ]
})

export class PuestoViewComponent implements OnInit{
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
        this.title = 'Organizacion';
        this.token = _UserService.getToken();
    }

    ngOnInit(){
        this.getPuestos();
    }

    //llamado el lisrado de los puertos
    getPuestos(){
        this._PuestoService.getPuestos(this.token).subscribe(
            response =>{
                this.puestos = response.puestos;
            },error =>{
                console.log(<any>error);
            });
    }

    deltetePuesto(id){
        if(confirm('Seguro que desea eliminar este registro?')){
            this._PuestoService.deltePuesto(this.token,id).subscribe(
                response=>{
                    this.getPuestos();
                },error=>{
                    console.log(<any>error);
                }
            )
        }
    }




}//END Class