import { Component, OnInit } from '@angular/core';
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
    public expan: boolean;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _PersonalUtil: PersonalUtil,
    ) {
        this.token = this._UserService.getToken();
        this.identity = this._UserService.getIdentity();
        this.busqueda = { inicio: "", final: "", socio: "" };
    }

    ngOnInit() {
        this.getEquipo();
    }

    /*==============================================================
           FUNCION PARA EL CUADRO DE DIALOGO DE REGISTRO DE USUARIO
    ================================================================ */
    
    getEquipo() {
        this._GeneralCallService.getRecords(this.token, 'here').subscribe(
            response => {
                let perso = this._PersonalUtil.getFamilia(response);
                perso.splice(0,1);
                this.personaList = perso;
            });
    }

    /*==============================================================
            FUNCION PARA TRAER LA LISTA DE CUENTAS POR COBRAR
    ================================================================ */
    getRequisicionCobrar() {
        this._GeneralCallService.storeRecord(this.token, 'cxc', this.busqueda).subscribe(
            response => {
                this.repoRequi = response.requisicion;
            }, error => {
                console.log(<any>error);
            }
        );
    }


}