import { Component, OnInit} from '@angular/core';
import { Proveedor } from './../../../models/proveedores';
import { Contacto } from './../../../models/contacto';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import { Busqueda} from 'src/app/models/busqueda';


@Component({
    selector: 'proveedor-view',
    templateUrl: './view.component.html',
    providers:[
        UserService,
        GeneralCallService
    ]
})

export class ProveedorViewComponent implements OnInit{
    public title: string;
    public status: string;
    public token: any;
    public proveedores:Array<Proveedor>;
    public contactos: Array<Contacto>;
    public busqueda:Busqueda;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService:GeneralCallService
    ){
        this.title='Proveedores';
        this.token = this._UserService.getToken();
        this.busqueda = new Busqueda(null, null, null);
    }

    ngOnInit(){
        this.getProveedores();
    }

    getProveedores(){
        this._GeneralCallService.getRecords(this.token,'proveedores').subscribe(
            response=>{
                this.proveedores = response.proveedores;
            },error=>{
            console.log(<any>error);
            });
    }

    deleteRecord(id){
        if(confirm('Eliminar Registro')){
            this._GeneralCallService.delteRcord(this.token,'proveedores',id).subscribe(
                response=>{
                    this.getProveedores();
                }
            );
        }
    }
}//End Class