import { UserService } from 'src/app/services/user.service';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../../services/util/dateAdapter';
import { GeneralCallService } from 'src/app/services/generalCall.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Busqueda } from 'src/app/models/busqueda';
import { Pedido } from 'src/app/models/pedido';
import { PersonalUtil } from '../../../../services/util/personal.util';
import { Conceptoahorro } from 'src/app/models/conceptoahorro';

@Component({
    selector: 'ahorro-view',
    templateUrl: './ahorro-view.component.html',

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

/*================================================================================================
    MODULO PARA VISUALIZAR TODOS LOS PEDIDOS DEL DIA  Y ASIGNAR EL TOTAL A UNA CAJA YA EXISTENTE
===================================================================================================*/

export class AhorroViewComponent {
    public concep: Conceptoahorro;
    public token: any;
    public perso: Array<any>;
    public title: string;
    public busqueda: Busqueda;
    public lisahorro: Array<Pedido>;
    public ind: number;


    constructor(
        private _PersonalUtil: PersonalUtil,
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router
    ) {
        this.token = this._UserService.getToken();
        this.title = "AHORRO DIARIO";
        this.busqueda = new Busqueda(null, null, null);
        this.concep = new Conceptoahorro(0, null, null, 0, 0, null);
    }

    ngOnInit() {
        this.getListPersonal();
    }

    /*==============================================================
          FUNCION PARA CONTAR EL TOTAL DE LOS CONCEPTOS
  ================================================================ */
    getTotal() {
        return this.lisahorro.map(c => c.ahorro).reduce((ant, act) => +ant + +act, 0);
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
         GENERAR LISTA DE PEDIDOS SIN PAGAR CON EL BOTON BUSCAR
   =============================================================*/

    listaahorro() {
        this._GeneralCallService.storeRecord(this.token, 'lisahorro', this.busqueda).subscribe(
            response => {
                this.lisahorro = response.ahorroall;
            }
        )

    }

    /*==========================================================
        APLICAR EL TOTAL DE PEDIDOS EN CONCEPTOAHORRO
    =============================================================*/

    ingresaahorro(i) {
        this.ind = i;
        this._GeneralCallService.storeRecord(this.token,'conceptos', this.lisahorro[i]).subscribe(
            response => {
                if (response.code == 200) {
                    this.lisahorro.splice(i, 1);
                    this.ind = null;
                }
            }, error => {
                console.log(<any>error);
                this.ind = null;
            }
        )

    }

    /*==========================================================
      BOTON SIRVE PARA PAGAR
    =============================================================*/
    pagar(i, index: number) {
        this.ind = index;
        this._GeneralCallService.updateRecord(this.token, 'pagar', this.lisahorro[i], this.lisahorro[i].fechapedido).subscribe(
            response => {
                if (response.code == 200) {
                    this.lisahorro.splice(index, 1);
                    this.ind = null;
                }
            }, error => {
                console.log(<any>error);
                this.ind = null;
            }
        );
    }

    /*==========================================================
      BOTON SIRVE PARA PAGAR TODA LA BUSQUEDA
    =============================================================*/
    pagartodo(index: number) {
        this._GeneralCallService.updateRecord(this.token, 'pagarto', this.lisahorro, 1).subscribe(
            response => {
                if (response.code == 200) {
                    this.lisahorro.splice(index);
                }
            }
        );
    }
}