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
    }

    onSubmit(form){
        console.log(this.token);
        this._GeneralCallService.storeRecord(this.token,'proveedores',this.proveedor).subscribe(
            response=>{
                this.proveedor = response.proveedor;
                this.status = response.status;
                if(this.status == 'success'){
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