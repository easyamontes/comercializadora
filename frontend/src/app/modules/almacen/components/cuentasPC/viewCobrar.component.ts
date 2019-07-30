import { Component, OnInit, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//Utils
import { PersonalUtil } from '../../../../services/util/personal.util';
//servicios
import { UserService } from './../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';
//Modelos
import { Busqueda } from 'src/app/models/busqueda';

@Component({
    selector: 'cobrar-view',
    templateUrl: './viewCobrar.component.html',
    providers: [
        UserService,
        GeneralCallService,
        PersonalUtil
    ]
})

export class CobranzaViewComponent implements OnInit {
    public title: string;
    public token: any;
    public identity: any;
    public busqueda: Busqueda;
    public personaList: Array<any>
    public repoRequi: Array<any>
    public repoArti: Array<any>
    public ind: number;
    public params: string;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _PersonalUtil: PersonalUtil,
        private _ActivatedRoute: ActivatedRoute
    ) {
        /*==============================================================
                INICIANDO PROPIEDADES DEL CONTROLADOR
        ================================================================ */
        this.token = this._UserService.getToken();
        this.identity = this._UserService.getIdentity();
        this.busqueda = { inicio: "", final: "", socio: "" };
        this.ind = null;
        /*==============================================================
                CACAHNDO EL PARAMETRO ENVIADO POR URL
        ================================================================ */
        this._ActivatedRoute.queryParams.subscribe(params => {
        })
        this._ActivatedRoute.params.subscribe(
            params => {
                this.params = params['tip'];
                switch (this.params) {
                    case 'c':
                        this.title = "Cobrar";
                        this.repoRequi = null;
                        break;
                    case 'p':
                        this.title = "Pagar";
                        this.busqueda.socio = this.identity.per;
                        this.requiCall();
                    default:
                        break;
                }
            });
    }

    ngOnInit() {
        this.getEquipo();
    }

    /*==============================================================
            FUNCION PARA CONTAR EL TOTAL DE LOS CONCEPTOS
    ================================================================ */
    getTotal() {
        return this.repoRequi.map(c => c.importe).reduce((ant, act) => +ant + +act, 0);
    }

    /*==============================================================
           FUNCION PARA EL CUADRO DE DIALOGO DE REGISTRO DE USUARIO
    ================================================================ */

    getEquipo() {
        this._GeneralCallService.getRecords(this.token, 'here').subscribe(
            response => {
                let perso = this._PersonalUtil.getFamilia(response);
                perso.splice(0, 1);
                this.personaList = perso;
            });
    }

    /*==============================================================
            FUNCION PARA VALIDAR LA INFORMACION DE LOS FILTROS
    ================================================================ */
    getRequisicionCobrar() {
        let finicio = Date.parse(this.busqueda.inicio);
        let ffinal = Date.parse(this.busqueda.final);
        if (finicio && ffinal) {
            if (finicio > ffinal) {
                alert('Rango de fechas invalido');
                return;
            }
        } else {
            alert('Rango de fechas invalido');
            return;
        }
        this.requiCall();
    }

    /*==============================================================
            FUNCION PARA TRAER LA LISTA DE CUENTAS POR COBRAR
    ================================================================ */
    requiCall() {
        this._GeneralCallService.storeRecord(this.token, 'cxc', this.busqueda).subscribe(
            response => {
                this.repoRequi = response.requisicion;
            }, error => {
                console.log(<any>error);
            });
    }

    /*==============================================================
            DAR POR PAGADA LA REQUISICION
    ================================================================ */
    setPagado(item: any, index: number) {
        this.ind = index;
        item.statuspago = 'PAGADO';
        this._GeneralCallService.updateRecord(this.token, 'requisicion', item, item.id).subscribe(
            response => {
                if (response.code == 200) {
                    this.repoRequi.splice(index, 1);
                    this.ind = null;
                }
            }, error => {
                console.log(<any>error);
                this.ind = null;
            }
        );
    }
}