import { Component, OnInit } from '@angular/core';
import { Proveedor } from './../../../models/proveedores';
import { Contacto } from './../../../models/contacto';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';

@Component({
    selector: 'proveedor-edit',
    templateUrl: './edit.component.html',
    providers:[
        UserService,
        GeneralCallService
    ]
})

export class ProveedorEditComponent implements OnInit{
    public title:string;
    public status: string;
    public token: any;
    public proveedor: Proveedor;
    public contactos: Array<Contacto>;

    constructor(
        private _UserService: UserService,
        private _route: ActivatedRoute,
        private _GeneralCallService: GeneralCallService,
        private _router: Router
    ){
        this.title ="Editar Proveedor";
        this.token = this._UserService.getToken();
    }

    ngOnInit(){
        this._route.params.subscribe(
            params=>{
                let id = +params['id'];
                this.getProveedor(id);
            });
    }

    getProveedor(id){
        this._GeneralCallService.getRecrod(this.token,'proveedores',id).subscribe(
            response=>{
                if(response.status == 'success'){
                    this.proveedor = response.proveedor;
                    if(response.proveedor.contactos){
                        this.contactos = response.proveedor.contactos;
                    }else{
                        this.contactos = [];
                    }     
                }else{
                    this._router.navigate(['proveedores']);
                }
            },error=>{
                console.log(<any>error);
            });
    }

    /**Funcion que agrega un nuevo contacto al arrat */
    addContacto(){
        let nuevoContacto = new Contacto(0,0,this.proveedor.id,'','',null);
        this.contactos.push(nuevoContacto);
    }

    /**Funcionpara eliminar el contacto */
    deleteContacto(i){
        this.contactos.splice(i,1);
    }



    onSubmit(form){
        this._GeneralCallService.updateRecord(this.token,'proveedores',this.proveedor,this.proveedor.id).subscribe(
            response=>{
                this.proveedor = response.proveedor;
                this.status = response.status;
                if(this.status == 'success'){
                    // Mandando los contactos a guardar
                    this._GeneralCallService.storeRecord(this.token,'contactos',this.contactos).subscribe(
                        error=>{
                            console.log(<any>error);
                        });
                    this._router.navigate(['proveedores']);
                }
            },error=>{
                console.log(<any>error);
            });
    }

    cancelEdit(){
        this.proveedor = null;
        this._router.navigate(['proveedores']);
    }

}//End Class