import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//Utils
import { PersonalUtil } from '../../../../services/util/personal.util';
//servicios
import { UserService } from './../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';
//Modelos
import { Requisicion } from '../../../../models/requisicion';
import { Almacen } from './../../../../models/almacen';

@Component({
    selector: 'requi-store',
    templateUrl: './store.component.html',
    providers: [
        UserService,
        GeneralCallService,
        PersonalUtil
    ]
})

export class RequisicionStoreComponent implements OnInit {
    public title: string;
    public params: number;
    public status: string;
    public token: any;
    public identity: any;
    public rurl: string[];
    public requi: Requisicion;
    public item: Array<Almacen>;
    public displayedColumns: string[];
    public articulos: Array<Almacen>;
    public provlist: Array<any>;
    public artilist: Array<any>;
    public spin: boolean;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _ActivatedRoute: ActivatedRoute,
        private _router: Router,
        private _PersonalUtil: PersonalUtil
    ) {
        this._ActivatedRoute.params.subscribe(
            params => {
                this.params = +params['sure'];
            });
        let fe = new Date();
        let date: string = fe.toISOString();
        this.identity = this._UserService.getIdentity();
        this.token = this._UserService.getToken();
        this.item = [];
        this.articulos = [];
        this.spin = false;
        if (this.params == 1) {
            this.setVenta(date);
        } else {
            this.setCompra(date);
        }
    }

    /*=================================================================
        Inicia Los valores usados en la vista de Compra
     ====================================================================*/
    setCompra(date) {
        this.title = 'Nueva Compra';
        this.rurl = ["lproved", "lartic"];
        this.requi = new Requisicion(0, this.identity.sub, 0, 0, 0, "COMPRA", 'NUEVO', 0, date, null, null, null);
    }

    /*=================================================================
        Inicia Los valores usados en la vista de Transpasos
    ====================================================================*/
    setVenta(date) {
        this.title = 'Nuevo Traspaso';
        this.rurl = ["here", "almaitem"];
        this.requi = new Requisicion(0, this.identity.sub, 0, 0, 0, "VENTA", 'NUEVO', 0, date, null, null, null);
    }

    ngOnInit() {
        this.getListForSelect();
        this.getListArticulo();
    }

    /*=================================================================
                    Invoca la de Proveedores
    ====================================================================*/
    getListForSelect() {
        this._GeneralCallService.getRecords(this.token, this.rurl[0]).subscribe(
            response => {
                if (this.params == 1) {
                    this.provlist = this._PersonalUtil.getFamilia(response);
                    this.provlist.splice(0, 1);
                } else {
                    this.provlist = response.proveedorll;
                }
            }
        );
    }

    /**invoca la de articuo (como objetos)*/
    getListArticulo() {
        this._GeneralCallService.getRecords(this.token, this.rurl[1]).subscribe(
            response => {
                if (this.params == 1) {
                    this.artilist = response.existencia;
                } else {
                    this.artilist = response.articulos;
                }
            }
        );
    }

    /**refresca la seleccion del articulo segun la seleccion*/
    setArticulo(id, index) {
        if (!id) {
            this.articulos[index] = this.cleanKeys(this.articulos[index]);
        } else {
            this.articulos[index].codigo = this.artilist.find(x => x.id == id).codigo;
            this.articulos[index].articulo = this.artilist.find(x => x.id == id).articulo;
            this.articulos[index].marca = this.artilist.find(x => x.id == id).marca;
            this.articulos[index].modelo = this.artilist.find(x => x.id == id).modelo;
            if (this.params == 1) {
                this.articulos[index].articulo_id = this.artilist.find(x => x.id == id).articulo_id;
                this.articulos[index].proveedor_id = this.artilist.find(x => x.id == id).proveedor_id;
                this.articulos[index].costo = this.artilist.find(x => x.id == id).costo;
            }
            this.articulos[index].totalExistencia = this.artilist.find(x => x.id == id).totalExistencia;
        }
    }

    cleanKeys(Obj: Almacen): Almacen {
        Object.entries(Obj).forEach(([key, value]) => {
            if (key != 'proveedor_id') {
                Obj[key] = null;
            }
        });
        return Obj;
    }

    /**crea una nueva fila en la tabla de Articulos */
    createArticulo() {
        if (this.requi.proveedor_id || this.requi.pdestino_id) {
            let nitem = new Almacen(null, null, null, null, this.requi.proveedor_id,null,null,null,null,null,null,null,null,null,0,0,0,0,0,0,0,0,0);
            this.articulos.push(nitem);
            this.requi.importe = this.getTotalCost();
        }
    }

    /**Eliminando la fila creada */
    deleteArticulo(index) {
        this.articulos.splice(index, 1);
    }


    onSubmit() {
        this.spin=true;
        this.requi.importe = this.getTotalCost();
        if (this.requi.pdestino_id == 0) {
            this.requi.pdestino_id = this.identity.sub;
        }
        this._GeneralCallService.storeRecord(this.token, 'requisicion', this.requi).subscribe(
            response => {
                if (response.code == 200) {
                    this.requi = response.requisicion;
                    for (var c = 0; c < this.articulos.length; c++) {
                        this.articulos[c].total = this.articulos[c].cantidad * this.articulos[c].precio;
                        this.articulos[c].folio = this.requi.folio;
                        this.articulos[c].tipo = this.requi.tipo;
                        this.articulos[c].requisicion_id = this.requi.id;
                        this.articulos[c].userp_id = this.requi.pdestino_id;
                        this.articulos[c].pendiente = this.articulos[c].cantidad;
                        this.articulos[c].recepcion = this.articulos[c].cantidad;
                    }
                    this._GeneralCallService.storeRecord(this.token, 'almaitem', this.articulos).subscribe(
                        response => {
                            this._router.navigate(['almacen']);
                        }, error => {
                            this.spin=false;
                            console.log(<any>error);
                        });
                }
            }, error => {
                this.spin=false;
                console.log(<any>error);
            });
    }

    onCancel() {
        this._router.navigate(['almacen']);
    }

    getTotalCost() {
        let precio = this.articulos.map(c => c.precio).reduce((ant, act) => ant + act, 0);
        let cantidad = this.articulos.map(c => c.cantidad).reduce((ant, act) => ant + act, 0);
        return precio * cantidad;
    }

}//End Class