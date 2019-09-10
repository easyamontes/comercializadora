import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
//servicios
import { UserService } from './../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';
import { PersonalUtil } from './../../../../services/util/personal.util';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../../services/util/dateAdapter';
//Modelos
import { Almacen } from 'src/app/models/almacen';
import { Busqueda } from '../../../../models/busqueda';

@Component({
    selector: 'reporte-pieza',
    templateUrl: './reporte-piezas.component.html',
    providers: [
        UserService,
        GeneralCallService,
        {
            provide: DateAdapter, useClass: AppDateAdapter
        },
        {
            provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }
    ]
})


export class ReportePiezaComponent implements OnInit {
    public title: string;
    public token: any;
    public busqueda: Busqueda;
    public lista: Array<Almacen>;
    public perso: Array<any>;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _PersonalUtil: PersonalUtil,
        private _router: Router
    ) {
        this.token = this._UserService.getToken();
        this.title = 'Reporte Piezas';
        this.busqueda = new Busqueda(null, null, null,null);
    }

    ngOnInit() {
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

    listapieza() {
        this._GeneralCallService.storeRecord(this.token, 'lispieza', this.busqueda).subscribe(
            response => {
                this.lista = response.piezaall;
                this.busqueda.socio = null;
                this.busqueda.final = null;
                this.busqueda.inicio = null;
            }
        )

    }

}