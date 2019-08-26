import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { PersonalUtil } from '../../../../services/util/personal.util';
import { UserService } from 'src/app/services/user.service';
import { GeneralCallService } from 'src/app/services/generalCall.service';
import { Busqueda } from 'src/app/models/busqueda';
import { Conceptoahorro } from 'src/app/models/conceptoahorro';

@Component({
    selector: 'ahorro-status',
    templateUrl: './ahorro-status.component.html',
    providers: [
        UserService,
        GeneralCallService,
        PersonalUtil
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
    public nom: any;
    public aler: number;
    public cero:number;


    constructor(
        private _PersonalUtil:PersonalUtil,
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router

    ) {
        this.token = this._UserService.getToken();
        this.busqueda = new Busqueda(null, 'SIN PAGAR', null);
        this.aler = null;
        this.cero = null;
     

    }
    ngOnInit() {
        this.getListPersonal();
    }

    getListPersonal() {
        this._GeneralCallService.getRecords(this.token, 'here').subscribe(
            response => {
                this.perso = this._PersonalUtil.getFamilia(response);
            }
        );
    }
    /*==============================================================
            FUNCION PARA GESTIONAR EL CAMBIO DE REPORTE
    ================================================================ */

    /* ==============================================
       LISTA PARA EL FONDO DE AHORRO SIN PAGAR
    ==================================================*/
    listaa() {
        this._GeneralCallService.storeRecord(this.token, 'listatus', this.busqueda).subscribe(
            response => {
                this.listaahorro = response.statusahorro;
                this.pe = response.total[0].ahorrodia;
                this.nom = response.statusahorro[0].nombre;
            }
        )
    }

    /* =====================================================================================
           BOTON MANDAR A PAGAR FONDO DE AHORRO
    ======================================================================================== */
    pagar() {
        let fe = new Date();
        let hoy = fe.toISOString();
        let tot = +this.busqueda.inicio * -1;
        let ah = this.pe;
        let nombre = this.nom;
        this.nueviPago = {
            personal_id: this.busqueda.socio,
            fechapedido: hoy,
            ahorrodia: tot,
            tipo: 'S',
            ahr: ah,
            no:nombre,
            status:'PAGADO',
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
                this.busqueda.final = null;
                this.pe = response.total[0].ahorrodia;
            }
        )
    }

}