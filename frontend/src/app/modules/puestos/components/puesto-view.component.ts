import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import { Puesto } from 'src/app/models/puesto';
import { Busqueda} from 'src/app/models/busqueda';

@Component({
    selector: 'puestos',
    templateUrl: './puesto-view.component.html',
    styleUrls:['./estilo.component.css'],
    providers: [
        UserService,
        GeneralCallService
    ]
})

export class PuestoViewComponent implements OnInit{
    public title: string;
    public user: User;
    public status: string;
    public token;
    public puestos: Array<Puesto>;
    public busqueda:Busqueda;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService
    ){
        this.title = 'Organización';
        this.token = this._UserService.getToken();
        this.busqueda = new Busqueda(null, null, null);
    }

    ngOnInit(){
        this.getPuestos();
    }

    //llamado el lisrado de los puertos
    getPuestos(){
        this._GeneralCallService.getRecords(this.token,'puestos').subscribe(
            response =>{
                this.puestos = response.puestos;
            },error =>{
                console.log(<any>error);
            });
    }

    deltetePuesto(id){
        if(confirm('Seguro que desea eliminar este registro?')){
            this._GeneralCallService.delteRcord(this.token,'puestos',id).subscribe(
                response=>{
                    this.getPuestos();
                },error=>{
                    console.log(<any>error);
                }
            )
        }
    }




}//END Class