import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
//servicios
import { UserService } from './../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';

@Component({
   selector: 'pedido-default',
   templateUrl: './reporte-default.component.html',
   styleUrls: ['./reporte.component.css'],
   providers: [
       UserService,
       GeneralCallService,
   ]
})


export class ReporteDefaultComponent implements OnInit {
    public title:string;
    public token:any;

    constructor (
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router
    ){
        this.token = this._UserService.getToken();
    }

    ngOnInit(){
        
    }

}