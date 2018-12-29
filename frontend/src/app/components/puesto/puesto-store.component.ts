import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { PuestoService } from '../../services/puesto.service';
import { Puesto } from '../../models/puesto';
import { elementStyleProp } from '@angular/core/src/render3';

@Component({
    selector: 'puesto-store',
    templateUrl: './puesto-edit.component.html',
    providers: [
        UserService,
        PuestoService
    ]
})

export class PuestoStoreComponent implements OnInit{
    public title: string;
    public user: User;
    public status_puesto: any;
    public token: any;
    public puestoe: Puesto;

    constructor(
        private _UserService: UserService,
        private _PuestoService: PuestoService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.title = 'Nuevo Puesto';
        this.token = _UserService.getToken();
    }

    ngOnInit(){
        this.puestoe = new Puesto(1,'',0,'');
    }

    onSubmit(form){
        this._PuestoService.storePuesto(this.token,this.puestoe).subscribe(
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