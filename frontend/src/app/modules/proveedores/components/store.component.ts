import { Component, OnInit } from '@angular/core';
import { Proveedor } from './../../../models/proveedores';
import { Contacto } from './../../../models/contacto';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';

@Component({
    selector: 'proveedor-store',
    templateUrl: './edit.component.html',
    providers:[
        UserService,
        GeneralCallService
    ]
})

export class ProveedorStoreComponent implements OnInit{
    public title:string;
    public status: string;
    public token: any;
    public proveedor: Proveedor;
    public contactos: Array<Contacto>;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router
    ){
        this.title ="Nuevo Proveedor"
        this.token = this._UserService.getToken();
    }

    ngOnInit(){
        this.proveedor = new Proveedor(0,'','','','','','','','','','','');
        this.contactos = [];
    }
    /**Funcion que agrega un nuevo contacto al arrat */
    addContacto(){
        let nuevoContacto = new Contacto(0,0,0,'','',null);
        this.contactos.push(nuevoContacto);
    }

    /**Funcionpara eliminar el contacto */
    deleteContacto(i){
        this.contactos.splice(i,1);
    }

    onSubmit(form){
        this._GeneralCallService.storeRecord(this.token,'proveedores',this.proveedor).subscribe(
            response=>{
                this.proveedor = response.proveedores;
                this.status = response.status;
                if(this.status == 'success'){
                    // Asignando el valor del id correspondiente
                    for(var c ; c < this.contactos.length;c++ ){
                        this.contactos[c].proveedor_id = this.proveedor.id;
                    }
                    // Mandando los contactos a guardar
                    this._GeneralCallService.storeRecord(this.token,'contactos',this.contactos).subscribe(
                        response =>{
                            console.log(<any>response);
                        },error=>{
                            console.log(<any>error);
                        });
                    this._router.navigate(['proveedores']);
                }
            },error=>{
                console.log(<any>error);
            }
        );

    }

    cancelEdit(){
        this.proveedor = null;
        this._router.navigate(['proveedores']);
    }

}//End Class