import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
//servicios
import { UserService } from './../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';
import { Pedido } from 'src/app/models/pedido';

@Component({
   selector: 'pedido-default',
   templateUrl: './reporte-premio.component.html',
   providers: [
       UserService,
       GeneralCallService,
   ]
})


export class ReportePremioComponent implements OnInit {
    public title:string;
    public token:any;
    public lista:Array<Pedido>;

    constructor (
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router
    ){
        this.token = this._UserService.getToken();
    }

    ngOnInit(){
        this.listapremio();
    }

    listapremio(){
        this._GeneralCallService.getRecords(this.token,'lispremio').subscribe(
            response =>{
                this.lista = response.pedidoall;
                console.log('lispremio')
            }
        )

    }

}