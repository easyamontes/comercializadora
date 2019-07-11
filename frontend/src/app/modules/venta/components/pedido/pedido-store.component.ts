import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserService } from '../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';
import { Almacen } from './../../../../models/almacen';
import { Pedido } from 'src/app/models/pedido';


@Component({
    selector: 'pedido-store',
    templateUrl: './pedido-store.component.html',

    providers: [
        UserService,
        GeneralCallService
    ]
})

export class PedidoStoreComponent implements OnInit, DoCheck {
    public title: string;
    public token: any;
    public pedi: Pedido;
    public pedidos: MatTableDataSource<Almacen>;
    public conceptoventa: Array<Almacen>;
    public status: any;
    public displayedColumns: string[] = ['codigo', 'existencia', 'nombre', 'cantidad', 'precio', 'total', 'diferencia', 'eliminar'];
    public lisart: Array<any>;
    public perso: Array<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;


    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router
    ) {
        this.title = 'Nuevo Pedido';
        this.conceptoventa = [];
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
        this._GeneralCallService.getRecords(this.token, 'personal').subscribe(
            response => {
                this.perso = response.personal;
            }
        );
    }


    setArticulo(id, index) {
        this.pedidos.data[index].codigo = this.lisart.find(x => x.id == id).codigo;
        this.pedidos.data[index].proveedor_id = this.lisart.find(x => x.id == id).proveedor_id;
        this.pedidos.data[index].articulo_id = this.lisart.find(x => x.id == id).articulo_id;
        this.pedidos.data[index].articulo = this.lisart.find(x => x.id == id).articulo;
        this.pedidos.data[index].marca = this.lisart.find(x => x.id == id).marca;
        this.pedidos.data[index].modelo = this.lisart.find(x => x.id == id).modelo;
        this.pedidos.data[index].existencia = this.lisart.find(x => x.id == id).totalExistencia;
    }

    setPersonal(id) {
        this.pedi.nombre = this.perso.find(x => x.id == id).nombre;

    }

    /*=============================================================
          AGREGAR CONCEPTO POR CONCEPTO
   ================================================================= */
    addConcepto() {
        let nuevoConcepto = new Almacen(0, 0, 0, 0, 0, 0, 0, null, "SALIDA", null, null, null, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        this.conceptoventa.push(nuevoConcepto);
        this.pedidos = new MatTableDataSource(this.conceptoventa);
        this.pedidos.paginator = this.paginator;
        this.pedidos.sort = this.sort;

    }

    /*=========================================================
       BOTON GUARDAR
    ============================================================ */

    Guardar() {
        console.log(this.token);
        this._GeneralCallService.storeRecord(this.token, 'ventas', this.pedi).subscribe(
            response => {
                this.pedi = response.pedido;
                if (response.code == 200) {

                    this.conceptoventa.forEach(item => {
                        item.pedido_id = this.pedi.id;
                        item.cantidad = item.cantidad;
                        item.existencia = item.cantidad;
                        item.recepcion = item.cantidad;
                        item.userp_id = this.pedi.pdestino;
                    })

                    /*==============================================================
                       GUARDAR CONCEPTOS INGRESADOS DENTRO DEL BOTON GUARDAR
                    ================================================================ */

                    this._GeneralCallService.storeRecord(this.token, 'almaitem', this.conceptoventa).subscribe(
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
        this.pedidos.data.splice(index, 1);
        this.pedidos._updateChangeSubscription();
    }

    /*========================================================
    CANCELAR TODO EL REGISTRO CON LOS ARTICULOS
    ==========================================================*/

    CancelEdit() {
        this.pedi = null;
        this._router.navigate(['./ventas/welcome']);
    }

    getTotalCost() {
        return this.conceptoventa.map(c => c.total).reduce((ant, act) => ant + act, 0);
    }


    validaExistncia(index) {
        this.conceptoventa[index].total = this.conceptoventa[index].cantidad * this.conceptoventa[index].precio;
    }
}

