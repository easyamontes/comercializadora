import { Component, OnInit, DoCheck } from '@angular/core';
import { PersonalUtil } from '../../../../services/util/personal.util';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';
import { Almacen } from './../../../../models/almacen';
import { Pedido } from 'src/app/models/pedido';
import { Personal } from 'src/app/models/personal';


@Component({
    selector: 'pedido-store',
    templateUrl: './pedido-store.component.html',

    providers: [
        UserService,
        GeneralCallService,
        PersonalUtil
    ]
})

export class PedidoStoreComponent implements OnInit, DoCheck {
    public title: string;
    public token: any;
    public pedi: Pedido;
    public pedidos: Array<Almacen>;
    public status: any;
    public lisart: Array<any>;
    public perso: Array<Personal>;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router,
        private _PersonalUtil: PersonalUtil,
    ) {
        this.title = 'Nuevo Pedido';
        this.pedidos = [];
        this.token = this._UserService.getToken();
        this.pedi = new Pedido(0, '', 0, 0, '', "SALIDA", '', 0, null,null,null,null,null);
    }

    ngOnInit() {
        this.getListArticulo();
        this.getListPersonal();
    }//end ngOnInit

    ngDoCheck() {
        if (this.pedi) {
            this.pedi.importe = this.getTotalCost();
        }

    }

    /*==========================================================
      GENERAR LISTA DE ARTICULOS
     =============================================================*/
    getListArticulo() {
        this._GeneralCallService.getRecords(this.token, 'lisventa').subscribe(
            response => {
                this.lisart = response.almacen;
            }
        );
    }

    /*==========================================================
      GENERAR LISTA DEL PERSONAL
     =============================================================*/
    getListPersonal() {
        this._GeneralCallService.getRecords(this.token, 'here').subscribe(
            response => {
                this.perso = this._PersonalUtil.getFamilia(response);
                this.perso.splice(0,1);
            }
        );
    }


    setArticulo(id, index) {
        this.pedidos[index].codigo = this.lisart.find(x => x.id == id).codigo;
        this.pedidos[index].proveedor_id = this.lisart.find(x => x.id == id).proveedor_id;
        this.pedidos[index].articulo_id = this.lisart.find(x => x.id == id).articulo_id;
        this.pedidos[index].articulo = this.lisart.find(x => x.id == id).articulo;
        this.pedidos[index].marca = this.lisart.find(x => x.id == id).marca;
        this.pedidos[index].modelo = this.lisart.find(x => x.id == id).modelo;
        this.pedidos[index].existencia = this.lisart.find(x => x.id == id).totalExistencia;
    }

    setPersonal(id) {
        this.pedi.nombre = this.perso.find(x => x.id == id).nombre;

    }

    /*=============================================================
          AGREGAR CONCEPTO POR CONCEPTO
   ================================================================= */
    addConcepto() {
        let nuevoConcepto = new Almacen(0, 0, 0, 0, 0, 0, 0, null, "SALIDA", null, null, null, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        this.pedidos.push(nuevoConcepto);
    }

    /*=========================================================
       BOTON GUARDAR
    ============================================================ */
    Guardar() {
        this._GeneralCallService.storeRecord(this.token, 'ventas', this.pedi).subscribe(
            response => {
                this.pedi = response.pedido;
                if (response.code == 200) {
                    this.pedidos.forEach(item => {
                        item.pedido_id = this.pedi.id;
                        item.existencia = item.cantidad;
                        item.recepcion = item.cantidad;
                        item.userp_id = this.pedi.pdestino;
                    })

                    /*==============================================================
                       GUARDAR CONCEPTOS INGRESADOS DENTRO DEL BOTON GUARDAR
                    ================================================================ */
                    this._GeneralCallService.storeRecord(this.token, 'almaitem',this.pedidos).subscribe(
                        response => {
                            console.log(response);

                        }, error => {
                            console.log(<any>error);
                        });
                    this._router.navigate(['./ventas/welcome']);
                } else {
                    alert(response.error);
                    this._router.navigate(['./ventas/welcome']);
                }
            }, error => {
                console.log(<any>error);
            });
    }

    /*========================================================
    ELIMINAR REGISTRO DE CONCEPTOS
    ========================================================== */

    deleteRecord(index) {
        this.pedidos.splice(index, 1);
    }

    /*========================================================
    CANCELAR TODO EL REGISTRO CON LOS ARTICULOS
    ==========================================================*/
    CancelEdit() {
        this.pedi = null;
        this._router.navigate(['./ventas/welcome']);
    }

    getTotalCost() {
        return this.pedidos.map(c => c.total).reduce((ant, act) => ant + act, 0);
    }


    validaExistncia(index) {
        this.pedidos[index].total = this.pedidos[index].cantidad * this.pedidos[index].precio;
    }

}