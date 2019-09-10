import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
//servicios
import { UserService } from './../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';
import { PersonalUtil } from './../../../../services/util/personal.util';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../../services/util/dateAdapter';
//Modelos
import { Pedido } from 'src/app/models/pedido';
import { Busqueda } from '../../../../models/busqueda';


@Component({
   selector: 'pedido-default',
   templateUrl: './reporte-premio.component.html',
   providers: [
       UserService,
       GeneralCallService,
       PersonalUtil,
       {
           provide: DateAdapter, useClass: AppDateAdapter
       },
       {
           provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
       }
   ]
})


export class ReportePremioComponent implements OnInit {

    public title:string;
    public token:any;
    public lista:Array<Pedido>;
    public busqueda:Busqueda;
    public perso: Array<any>;
 


    constructor (
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _PersonalUtil: PersonalUtil,
        private _router: Router
    ){
        this.token = this._UserService.getToken();
        this.title = 'Reporte Premio';
        this.busqueda = new Busqueda (null,null,null,null);
        
    }

    ngOnInit(){
        this.getListPersonal();
    }

    /*==========================================================
      GENERAR LISTA DEL PERSONAL
     =============================================================*/

     getListPersonal() {
        this._GeneralCallService.getRecords(this.token, 'here').subscribe(
            response => {
                this.perso = this._PersonalUtil.getFamilia(response);
            }
        );
    }
 /*==========================================================
      BOTON BUSCAR
=============================================================*/
    listapremio(){
        this._GeneralCallService.storeRecord(this.token,'lispremio',this.busqueda).subscribe(
            response =>{
                this.lista = response.pedidoall;
                this.busqueda.inicio = null;
                this.busqueda.final = null;
                this.busqueda.socio = null;
            }
        )

    }

}
