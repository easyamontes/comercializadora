import { UserService } from 'src/app/services/user.service';
import { GeneralCallService } from 'src/app/services/generalCall.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Busqueda } from 'src/app/models/busqueda';
import { Ahorro } from 'src/app/models/ahorro';

@Component({
    selector: 'ahorro-status',
    templateUrl: './ahorro-status.component.html',

    providers: [
        UserService,
        GeneralCallService
    ]
})

/*================================================================================================
     MODULO PARA VISUALIZAR TODOS LAS CAJAS DE FONDO DE AHORRO QUE ESTAN CREADAS EN EL SISTEMA
 ===================================================================================================*/

export class AhorroStatusComponent {
    public token: any;
    public title: string;
    public busqueda: Busqueda;
    public listaahorro: Array<Ahorro>;


    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router

    ) {
        this.token = this._UserService.getToken();
        this.busqueda = new Busqueda(null, null, null);

    }

    listaa(){
        this._GeneralCallService.storeRecord(this.token,'listatus',this.busqueda).subscribe(
            response =>{
                this.listaahorro = response.statusahorro;
            }
        )
    }

}