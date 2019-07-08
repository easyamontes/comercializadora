import { Component, OnInit } from "@angular/core";
import { UserService } from 'src/app/services/user.service';
import { GeneralCallService } from 'src/app/services/generalCall.service';
import { Router } from '@angular/router';
import { Ahorro } from 'src/app/models/ahorro';


@Component({
    selector: 'ahorro-sto',
    templateUrl: './ahorro-store.component.html',

    providers: [
        UserService,
        GeneralCallService

    ]
})

export class AhorroStoreComponent {

    public token: any;
    public perso: Array<any>;
    public ahor: Ahorro;
    
    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router 

    ){
        this.token = this._UserService.getToken();
        this.ahor = new Ahorro(0,null,null,null,0,0,null);    
    }

    ngOnInit(){
        this.getListPersonal();
    }

    getListPersonal() {
        this._GeneralCallService.getRecords(this.token, 'personal').subscribe(
            response => {
                this.perso = response.personal;
            }
        );
    }

    setPersonal(id) {
        this.ahor.nombre = this.perso.find(x => x.id == id).nombre;

    }

}