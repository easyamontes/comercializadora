import { UserService } from 'src/app/services/user.service';
import { GeneralCallService } from 'src/app/services/generalCall.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Busqueda } from 'src/app/models/busqueda';
import { Pedido } from 'src/app/models/pedido';
import { Conceptoahorro } from 'src/app/models/conceptoahorro';

@Component({
    selector: 'ahorro-view',
    templateUrl: './ahorro-view.component.html',

    providers: [
        UserService,
        GeneralCallService
    ]
})

    /*================================================================================================
        MODULO PARA VISUALIZAR TODOS LOS PEDIDOS DEL DIA  Y ASIGNAR EL TOTAL A UNA CAJA YA EXISTENTE
    ===================================================================================================*/

export class AhorroViewComponent {
    public concep: Conceptoahorro;
    public token: any;
    public perso: Array<any>;
    public title: string;
    public busqueda: Busqueda;
    public lisahorro: Array<Pedido>;


    constructor(

        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router
    ) {
        this.token = this._UserService.getToken();
        this.title = "AHORRO DIARIO";
        this.busqueda = new Busqueda(null, null, null);
        this.concep = new Conceptoahorro (0,null,null,0,0,null);
    }

    ngOnInit() {
        this.getListPersonal();
      }

    /*==========================================================
          GENERAR LISTA DEL PERSONAL
    =============================================================*/
    getListPersonal() {
        this._GeneralCallService.getRecords(this.token, 'personal').subscribe(
            response => {
                this.perso = response.personal;
            }
        );
    }

     /*==========================================================
          GENERAR LISTA DE PEDIDOS SIN PAGAR EN CAJA DE AHORRO BOTON BUSCAR
    =============================================================*/

    listaahorro(){
        this._GeneralCallService.storeRecord(this.token,'lisahorro',this.busqueda).subscribe(
            response =>{
                this.lisahorro = response.ahorroall;
            }
        )

    }

    /*==========================================================
        APLICAR EL TOTAL DE PEDIDOS EN CONCEPTOAHORRO
    =============================================================*/

    ingresaahorro(i){
        this._GeneralCallService.storeRecord(this.token,'conceptos',this.lisahorro[i]).subscribe(
            response =>{
                this.concep = response.concepto;
            }
        )

    }
}