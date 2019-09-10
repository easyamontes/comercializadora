import { Component, OnInit } from '@angular/core';

//Servicios
import { UserService } from './../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';
import { Router } from '@angular/router';
//Modelos
import { Requisicion } from './../../../../models/requisicion';
import { Busqueda } from 'src/app/models/busqueda';


@Component({
    selector: 'pendiete-view',
    templateUrl: './pendiente.component.html',
    providers: [
        UserService,
        GeneralCallService
    ]
})

export class RequisicionPendienteComponent implements OnInit {
    public token: any;
    public identity: any;
    public busqueda: Busqueda;
    public pendie: Array<Requisicion>;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router

    ) {
        this.identity = this._UserService.getIdentity();
        this.token = this._UserService.getToken();
        this.busqueda = new Busqueda(null, null, null, null);

    }

    ngOnInit() {
        this.getPendiente();
    }
    /* ====================================================
        FUNCION PARA TRAER LAS REQUISICIONES PENDIENTES 
   ========================================================*/
    getPendiente() {
        this._GeneralCallService.getRecords(this.token,'pendiente').subscribe(
            response => {
                if (response.code == 200) {
                    this.pendie = response.pendiente;
                } else {

                }

            }, error => {

            });
    }
}
