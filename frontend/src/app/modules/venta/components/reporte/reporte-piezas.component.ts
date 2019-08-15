import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
//servicios
import { UserService } from './../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';
import { Almacen } from 'src/app/models/almacen';
import { Busqueda } from '../../../../models/busqueda';

@Component({
   selector: 'reporte-pieza',
   templateUrl: './reporte-piezas.component.html',
   providers: [
       UserService,
       GeneralCallService,
   ]
})


export class ReportePiezaComponent implements OnInit {
    public title:string;
    public token:any;
    public busqueda:Busqueda;
    public lista:Array<Almacen>;
    public perso: Array<any>;

    constructor (
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router
    ){
        this.token = this._UserService.getToken();
        this.title = 'Reporte Piezas';
        this.busqueda = new Busqueda (null,null,null);
    }

    ngOnInit(){
        this.getListPersonal();
    }
     /*==========================================================
      GENERAR LISTA DEL PERSONAL
     =============================================================*/
    getListPersonal() {
        this._GeneralCallService.getRecords(this.token,'personal').subscribe(
            response => {
                this.perso = response.personal;
            }
        );
    }

    listapieza(){
        this._GeneralCallService.storeRecord(this.token,'lispieza',this.busqueda).subscribe(
            response =>{
                this.lista = response.piezaall;
                this.busqueda.socio = null;
                this.busqueda.final = null;
                this.busqueda.inicio = null;
            }
        )

    }

}