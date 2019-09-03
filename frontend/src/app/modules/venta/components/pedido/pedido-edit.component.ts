import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from "@angular/material";
//Servicios
import { UserService } from '../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../../services/util/dateAdapter';
//Modelos
import { Almacen } from './../../../../models/almacen';
import { Pedido } from 'src/app/models/pedido';



@Component({
    selector: 'pedido-edit',
    templateUrl: './pedido-edit.component.html',
    providers: [
        UserService,
        GeneralCallService,
        {
            provide: DateAdapter, useClass: AppDateAdapter
        },
        {
            provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }
    ]
})

export class PedidoEditComponent implements OnInit {
    public title: string;
    public status: string;
    public identity: any;
    public token: any;
    public pedi: Pedido;
    public pedidos: Array<Almacen>;
    public conceptoventa: Array<Almacen>;
    public list: Array<any>;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _route: ActivatedRoute,
        private _router: Router

    ) {

        this.token = this._UserService.getToken();
        this.pedi = new Pedido(0, '', 0, 0, '', '', '', 0, null, null, null, null, null);
        this.conceptoventa = [];

        this.title = 'Devolucion';
        this.identity = this._UserService.getIdentity();
    }

    ngOnInit() {
        this._route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getPedido(id);
            }
        );
        this.getPremio();

    }

    /*=======================================================================
       lista de premio
   ============================================================================= */
    getPremio() {
        this._GeneralCallService.getRecords(this.token, 'listapremio').subscribe(
            response => {
                this.list = response.premios;
            }
        )
    }

    /*=============================================================================
               LISTA DE PEDIDOS TABLA PEDIDOS
      =============================================================================== */

    getPedido(id) {
        this._GeneralCallService.getRecrod(this.token, 'ventas', id).subscribe(
            response => {
                if (response.status == 'success') {
                    this.pedi = response.pedido;
                    this.pedidos = (response.pedido.articulos);

                } else {
                    this._router.navigate(['ventas']);
                }
            }, error => {
                console.log(<any>error);
            }
        );
    }
    /*=============================================================================
      UPDATE DE TABLA PEDIDOS Y CREACION DE NUEVO REGISTRO PARA LOS CONCEPTOS
    =============================================================================== */
    Guardar() {
        this.pedi.tipo = "ENTRADA";
        this._GeneralCallService.updateRecord(this.token, 'ventas', this.pedi, this.pedi.id).subscribe(
            response => {
                this.pedi = response.pedido;
                this.status = response.status;
                if (this.status == 'success') {
                    this.conceptoventa = this.pedidos;
                    this._GeneralCallService.updateRecord(this.token, 'act', this.pedidos, this.pedidos[0].pedido_id).subscribe(
                    )
                    this.conceptoventa.forEach(item => {
                        item.pedido_id = this.pedi.id;
                        item.tipo = this.pedi.tipo;
                        item.recepcion = item.devolucion;
                        item.existencia = item.devolucion;
                        item.cantidad = item.devolucion;
                        item.userp_id = this.identity.sub;

                    })

                    /*==============================================================
                       GUARDAR CONCEPTOS INGRESADOS DENTRO DEL BOTON GUARDAR
                    ================================================================ */
                    this.conceptoventa = this.conceptoventa.filter(function (obj) {
                        return obj.devolucion > 0;

                    });

                    this._GeneralCallService.storeRecord(this.token, 'almaitem', this.conceptoventa).subscribe(
                        response => {
                        }, error => {
                            console.log(<any>error);
                        });

                    this._router.navigate(['./ventas/welcome']);
                }
            }, error => {
                console.log(<any>error);

            });
    }

    checkMinMax(index) {
        let cantidad = this.pedidos[index].existencia;
        let recepcion = this.pedidos[index].devolucion;
        if (cantidad < recepcion || recepcion < 0 || !recepcion) {
            this.pedidos[index].devolucion = 0;
        }
    }
    /*=============================================================================
      BOTON DE CANCELAR EN EL HTML
    =============================================================================== */
    CancelEdit() {
        this.pedi = null;
        this._router.navigate(['ventas']);
    }

}//end class