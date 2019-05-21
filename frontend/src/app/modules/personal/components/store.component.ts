import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//Utils
import { PersonalUtil } from '../../../services/util/personal.util';
//services
import { UserService } from '../../../services/user.service';
import { GeneralCallService } from '../../../services/generalCall.service';
import { GeneralListService } from '../../../services/generalList.service';
//Modelos
import { Personal } from '../../../models/personal';


@Component({
    selector: 'personal-store',
    templateUrl: './edit.component.html',
    providers: [
        UserService,
        GeneralCallService,
        GeneralListService
    ]
})

export class PersonalStoreComponent implements OnInit {
    public title: string;
    public status: string;
    public token: any;
    public persona: Personal;
    public selectList: any;
    public jefeList: Array<any>;
    public lisofi: Array<any>;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _GeneralListService: GeneralListService,
        private _PersonalUtil: PersonalUtil,
        private _router: Router
    ) {
        this.title = 'Alta colaborador';
        this.token = this._UserService.getToken();
    }

    ngOnInit() {
        this.persona = new Personal(0, 0, 0, '', '', '', '', '', '', '', '', '', '', '', '', '','');
        this.jefeList = [];
        this.getOptions();
        this.getHerencia();
        this.getOficina();
    }

    getHerencia() {
        this._GeneralCallService.getRecords(this.token, 'here').subscribe(
            response => {
                this.jefeList = this._PersonalUtil.getFamilia(response);
            });
    }

    getOptions() {
        this._GeneralListService.getListEmpleado(this.token, 'lpuesto').subscribe(
            response => {
                this.selectList = response.puestol;
            }
        );
    }
    /*========================================================================
        lista de oficinas 
    ==========================================================================*/
    getOficina() {
        this._GeneralCallService.getRecords(this.token, 'listaoficinas').subscribe(
            response => {
                this.lisofi = response.oficinall;
            }
        )

    }


    onSubmit(form) {
        this._GeneralCallService.storeRecord(this.token, 'personal', this.persona).subscribe(
            response => {
                this.persona = response.personal;
                this.status = response.status;
                if (this.status == 'success') {
                    this._router.navigate(['personal'])
                }
            }, error => {
                console.log(<any>error);
            }
        );
    }

    CancelEdit() {
        this.persona = null;
        this._router.navigate(['personal']);
    }

}//End class