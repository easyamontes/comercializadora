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
    templateUrl: './viewResultados.component.html',
    providers: [
        UserService,
        GeneralCallService,
        PersonalUtil
    ]
})

export class ResultadosViewComponent implements OnInit {
    public token: any;
    public identity: any;
    public title: string;
    public busqueda: Busqueda;
    public personaList: Array<any>;
    public repoResultado: Array<any>;
    public totalVenta: number;
    public totalCosto: number;
    public totalUtitlidad: number;
    public totalGastos:number;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _PersonalUtil: PersonalUtil,
        private _ActivatedRoute: ActivatedRoute
    ) {
        this.token = this._UserService.getToken();
        this.identity = this._UserService.getIdentity();
        this.title = 'Estado de Resultados';
        this.busqueda = new Busqueda(null, null, null);
    }

    ngOnInit() {
        this.getEquipo();
    }
    /*==============================================================
            Inboca el equipo seleccionado
    ================================================================ */
    getEquipo() {
        this._GeneralCallService.getRecords(this.token, 'here').subscribe(
            response => {
                this.personaList = this._PersonalUtil.getFamilia(response);
                this.busqueda.socio = this.identity.per;
            });
    }

    getEstadoResultados() {
        this._GeneralCallService.storeRecord(this.token, 'eresul', this.busqueda).subscribe(
            response => {
                this.repoResultado = response.report;
                this.totalGastos = response.gasto[0].total;
                this.getTotal();
            }, error => {
                console.log(<any>error);
            }
        )
    }

    getTotal() {

        if (!this.repoResultado) {
            return;
        }
        this.totalCosto = this.repoResultado.map(c => c.ctotal).reduce((ant, act) => +ant + +act, 0);
        this.totalVenta = this.repoResultado.map(c => c.vtotal).reduce((ant, act) => +ant + +act, 0);
        this.totalUtitlidad = this.repoResultado.map(c => c.utilidad).reduce((ant, act) => +ant + +act, 0);
    }


}//End Class