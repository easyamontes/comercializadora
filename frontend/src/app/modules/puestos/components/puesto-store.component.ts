import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import { Puesto } from '../../../models/puesto';


@Component({
    selector: 'puesto-store',
    templateUrl: './puesto-edit.component.html',
    providers: [
        UserService,
        GeneralCallService
    ]
})

export class PuestoStoreComponent implements OnInit{
    public title: string;
    public status_puesto: any;
    public token: any;
    public puestoe: Puesto;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router
    ){
        this.title = 'Nuevo Puesto';
        this.token = this._UserService.getToken();
    }

    ngOnInit(){
        this.puestoe = new Puesto(1,'',0,'');
    }

    onSubmit(form){
        this._GeneralCallService.storeRecord(this.token,'puestos',this.puestoe).subscribe(
            response =>{
                this.puestoe = response.puesto;
                this.status_puesto = response.status;
                if(this.status_puesto == 'success'){
                    this._router.navigate(['puestos']);
                }else{
                    this.status_puesto = 'Response Error'
                }
            },error=>{
                console.log(<any>error);
                this.status_puesto = <any>error;
            });
    }

}//End Class