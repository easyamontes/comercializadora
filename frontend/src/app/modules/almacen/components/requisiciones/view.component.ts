import { Component, OnInit } from '@angular/core';

//Servicios
import { UserService } from './../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';
//Modelos
import { Requisicion } from './../../../../models/requisicion';
import { Busqueda } from 'src/app/models/busqueda';

@Component({
    selector: 'requi-view',
    templateUrl: './view.component.html',
    providers: [
        UserService,
        GeneralCallService
    ]
})

export class RequisicionViewComponent implements OnInit {
    //Propiedades de la clasee
    public title: string;
    public status: string;
    public token: any;
    public requisicion: Array<Requisicion>;
    public busqueda: Busqueda;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
    ) {
        this.token = this._UserService.getToken();
        this.title = "Recepcion De Articulos";
        this.busqueda = new Busqueda(null, null, null);
    }

    ngOnInit() {
        this.getRequi();
    }

    /** Funcion para traer las requisiciones pendientes por recibir */
    getRequi() {
        this._GeneralCallService.getRecords(this.token, 'requisicion').subscribe(
            response => {
                if (response.code == 200) {
                    this.requisicion = response.requisicion;
                } else {
                    let emitem: Array<Requisicion>
                    emitem = [];
                    this.requisicion = (emitem);
                }
            }, error => {
                console.log(<any>error);
            });
    }

}//end class