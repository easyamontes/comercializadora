import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';

@Component({
    selector: 'inicio-default',
    templateUrl: './ahorro-inicio.component.html',

    providers: [
        UserService,
        GeneralCallService,
    ]
})
export class ahorroInicioComponent {
    public title: string;
    public token: any;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router

    ) {
        this.token = this._UserService.getToken();
    }

    ngOnInit() {

    }
}
