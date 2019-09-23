import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//Utils
import { PersonalUtil } from '../../../../services/util/personal.util';
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
//servicios
import { UserService } from './../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../../services/util/dateAdapter';
//Modelos
import { Busqueda } from 'src/app/models/busqueda';
import { Deposito } from '../../../../models/deposito';
import { Banco } from '../../../../models/banco';

@Component({
    selector: 'cobrar-view',
    templateUrl: './viewCobrar.component.html',
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

export class CobranzaViewComponent implements OnInit {
    @ViewChild('closeBtn') closeBtn: ElementRef;
    public title: string;
    public token: any;
    public identity: any;
    public busqueda: Busqueda;
    public personaList: Array<any>;
    public repoRequi: Array<any>;
    public repoArti: Array<any>;
    public pPagar:number;
    public ind: number;
    public params: string;
    public deposito: Deposito;
    public listBanco: Array<Banco>;
    public listDeposito: Array<Deposito>;

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
        this.busqueda = { inicio: "", final: "", socio: "", mul: "" };
        this.deposito = new Deposito(null, null, null, null, null, null, null, null, null, null, null, null);
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
                        this.getEquipo();
                        break;
                    case 'p':
                        this.title = "Pagar";
                        this.busqueda.socio = this.identity.per;
                        this.requiCall();
                        this.getBancos();
                    default:
                        break;
                }
            });
    }

    ngOnInit() {
    }

    /*==============================================================
                CIERRA EL MODAL CUANDO TERMINA SU FUNCION
    ================================================================ */
    private closeModal(): void {
        this.closeBtn.nativeElement.click();
    }

    /*==============================================================
            FUNCION PARA CONTAR EL TOTAL DE LOS CONCEPTOS
    ================================================================ */
    getTotal() {
        return this.repoRequi.map(c => c.xpagar).reduce((ant, act) => +ant + +act, 0);
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
                Invocando la lista de bancos
    ================================================================ */
    getBancos() {
        this._GeneralCallService.getRecords(this.token, 'bancos').subscribe(
            response => {
                this.listBanco = response.bancos;
                console.log(this.listBanco);
            }, error => {
                console.log(<any>error);
            }
        );
    }

    /*==============================================================
                Guardando el nuevo registro
    ================================================================ */
    onSubmit() {
        this.closeModal();
        if (confirm('Los datos introducidos son correctos?')) {
            this._GeneralCallService.storeRecord(this.token, 'deposito', this.deposito).subscribe(
                response => {
                    this.cleanKeys(this.deposito)
                    this.requiCall();
                }, error => {
                    console.log(<any>error);
                });
        }
    }

    /*==============================================================
                Invocando la lista de depositos
    ================================================================ */
    getDeposito(id) {
        this._GeneralCallService.getRecrod(this.token, 'deposito', id).subscribe(
            response => {
                this.listDeposito = response.depositos;
            }, error => {
                console.log(<any>error);
            });
    }

    /*==============================================================
                Invocando la lista de depositos
    ================================================================ */
    destroiDeposito(id){
        this._GeneralCallService.delteRcord(this.token,'deposito',id).subscribe(
            response =>{
                if(response.code == 400){
                    alert(response.message);
                }else{
                    this.listDeposito = response.depositos;
                }
            },error=>{
                console.log(<any>error);
            });
    }


    /*==============================================================
                Cancelando la escritura del deposito
    ================================================================ */
    onCancel() {
        this.closeModal();
        this.cleanKeys(this.deposito);
    }

    cleanKeys(Obj: any): any {
        Object.entries(Obj).forEach(([key, value]) => {
            Obj[key] = null;
        });
        return Obj;
    }

    onUpdate(id,item:Deposito){
        this._GeneralCallService.updateRecord(this.token,'deposito',item,id).subscribe(
            response=>{
                if(response.code == 400){
                    alert(response.message);
                }else{
                    this.getDeposito(item.requisicion_id);
                    this.getRequisicionCobrar();
                }
            },error=>{
                console.log(<any>error);
            }
        )
    }

    checkMinMax(){
        let cantidad = this.pPagar;
        let recepcion = + this.deposito.importe;
        if(cantidad < recepcion || recepcion < 0 || !recepcion){
            this.deposito.importe = null;
        }
    }

}