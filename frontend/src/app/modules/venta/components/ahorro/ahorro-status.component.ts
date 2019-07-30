import { UserService } from 'src/app/services/user.service';
import { GeneralCallService } from 'src/app/services/generalCall.service';

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Busqueda } from 'src/app/models/busqueda';

import { Conceptoahorro } from 'src/app/models/conceptoahorro';
import { error } from '@angular/compiler/src/util';

@Component({
    selector: 'ahorro-status',
    templateUrl: './ahorro-status.component.html',

    providers: [
        UserService,
        GeneralCallService
    ]
})

/*================================================================================================
     MODULO PARA VISUALIZAR TODOS LAS CAJAS DE FONDO DE AHORRO QUE ESTAN CREADAS EN EL SISTEMA
 ===================================================================================================*/

export class AhorroStatusComponent {
    public token: any;
    public title: string;
    public perso: Array<any>;
    public busqueda: Busqueda;
    public listaahorro: Array<Conceptoahorro>;
    public nueviPago: any;
    public pe: any;
    public aler: number;
    public cero:number;


    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router

    ) {
        this.token = this._UserService.getToken();
        this.busqueda = new Busqueda(null, null, null);
        this.aler = null;
        this.cero = null;

    }
    ngOnInit() {
        this.getListPersonal();
    }

    getListPersonal() {
        this._GeneralCallService.getRecords(this.token, 'personal').subscribe(
            response => {
                this.perso = response.personal;
            }
        );
    }
    listaa() {
        this._GeneralCallService.storeRecord(this.token, 'listatus', this.busqueda).subscribe(
            response => {
                this.listaahorro = response.statusahorro;
                this.pe = response.total[0].ahorrodia;
            }
        )
    }
    /* =====================================================================================
           BOTON MANDAR A PAGAR FONDO DE AHORRO
    ======================================================================================== */
    pagar() {
        let fe = new Date();
        let hoy = fe.toString();
        let tot = +this.busqueda.inicio * -1;
        let ah = this.pe;
        this.nueviPago = {
            personal_id: this.busqueda.socio,
            fechapedido: hoy,
            ahorrodia: tot,
            tipo: 'S',
            ahr: ah,
        }
        if (+this.busqueda.inicio <= 0) {
            this.aler = 1;
            this.cero = null;
            //alert('El Monto A Pagar Es: 0');
            return;
        }
        if (+this.busqueda.inicio > this.nueviPago.ahr) {
            this.cero = 1;
            this.aler = null;
            //alert('El Monto A Pagar Es Mayor Al Fondo Ahorrado');
            return;
        }
        this._GeneralCallService.storeRecord(this.token, 'pago', this.nueviPago).subscribe(
            response => {
                //this.listaahorro = response.concepto;
                this.busqueda.inicio = null;
                this.pe = response.total[0].ahorrodia;
            }
        )
    }

}