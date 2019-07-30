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
    templateUrl: './view.component.html',
    providers: [
        UserService,
        GeneralCallService,
        PersonalUtil
    ]
})

export class OverViewComponent implements OnInit {
    public date = new Date;
    public title: string;
    public token: any;
    public busqueda: Busqueda;
    public personaList: Array<any>;
    public level1: Array<any>;
    public level2: Array<any>;
    public level3: Array<any>;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _PersonalUtil: PersonalUtil,
        private _ActivatedRoute: ActivatedRoute
    ) {
        this.title = 'Overs'
        this.busqueda = new Busqueda(null, null, null);
        this.token = this._UserService.getToken();
    }

    ngOnInit() {
        this.getEquipo();
    }

    getEquipo() {
        this._GeneralCallService.getRecords(this.token, 'here').subscribe(
            response => {
                let perso = this._PersonalUtil.getFamilia(response);
                perso.splice(0, 1);
                this.personaList = perso.filter(function (obj) {
                    return obj.level <= 3;
                });
            });
    }

    callOver() {
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
        this.getOver();
    }

    getOver() {
        let idlevel1 = this.personaList.filter(function (item) {
            return item.level == 1;
        }).map(value => value.id);
        let idlevel2 = this.personaList.filter(function (item) {
            return item.level == 2;
        }).map(value => value.id);
        let idlevel3 = this.personaList.filter(function (item) {
            return item.level == 3;
        }).map(value => value.id);
        let filtro = {
            inicio: this.busqueda.inicio,
            final: this.busqueda.final,
            level1: idlevel1,
            level2: idlevel2,
            level3: idlevel3
        }

        this._GeneralCallService.storeRecord(this.token, 'overg', filtro).subscribe(
            response => {
                this.level1 = response.level1
                this.level2 = response.level2
                this.level3 = response.level3
            }
        );
    }

    getTotal(which: number) {

        if (!this.level1) {
            return 0;
        }
        switch (which) {
            case 1:
                return this.level1.map(c => c.piezas).reduce((ant, act) => +ant + +act, 0) * 1.50;
                break;
            case 2:
                return this.level2.map(c => c.piezas).reduce((ant, act) => +ant + +act, 0) * .50;
                break;
            case 3:
                return this.level3.map(c => c.piezas).reduce((ant, act) => +ant + +act, 0) * .50;
                break;
            default:
                break;
        }
    }
}//End Class