import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//Utils
import { PersonalUtil } from '../../../../services/util/personal.util';
import { AppDateAdapter, APP_DATE_FORMATS } from '../../../../services/util/dateAdapter';
import { DateAdapter, MAT_DATE_FORMATS } from "@angular/material";

//servicios
import { UserService } from './../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';

//Modelos
import { Requisicion } from '../../../../models/requisicion';
import { Almacen } from './../../../../models/almacen';
import { Personal } from 'src/app/models/personal';

@Component({
    selector: 'requi-traspaso',
    templateUrl: './traspaso.component.html',
    providers: [
        UserService,
        GeneralCallService,
        PersonalUtil,

        {
            provide: DateAdapter, useClass: AppDateAdapter
        },
        {
            provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
        }
    ]
})

export class RequisicionTraspasoComponent implements OnInit {

    public token: any;
    public identity: any;
    public perso: Array<Personal>;
    public articulos: Array<any>;
    public requi: Requisicion;
    public item: Array<Almacen>;
    public spin: boolean;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _ActivatedRoute: ActivatedRoute,
        private _router: Router,
        private _PersonalUtil: PersonalUtil,

    ) {
        let fe = new Date();
        let date: string = fe.toISOString();
        this.identity = this._UserService.getIdentity();
        this.token = this._UserService.getToken();
        this.requi = new Requisicion(0, null, 0, 0, 0, 'TRASPASO', 'NUEVO', 0,date, null, null, null);
        this.articulos = [];
        this.spin = false;
    }

    ngOnInit() {
        this.getListPersonal();
    }

    getListPersonal() {
        this._GeneralCallService.getRecords(this.token, 'here').subscribe(
            response => {
                this.perso = this._PersonalUtil.getFamilia(response);
                this.perso.splice(0, 1);
            }
        );
    }
    /**crea una nueva fila en la tabla de Articulos */
    createArticulo() {
        if(!this.item){
            this.getExistencia();
        }
        let nitem = new Almacen(null, null, null, null, null, null, null, null, null, null, null, null, null, null, 0, 0, 0, 0, 0, 0, 0, 0, 0, null);
        this.articulos.push(nitem);
        
    }

    /*Generar lista de articulos para el traspaso*/
    getExistencia() {
        this._GeneralCallService.getRecrod(this.token, 'traspaso', this.requi.porigen_id).subscribe(
            response => {
                this.item = response.existencia;
            }
        )
    }

     /*=====================================================
     ELIMINAR SI CAMBIA DE SOCIO ORIGEN
     =======================================================*/
     setEliminar(){
        this.articulos = [];
        this.item = null;
    }

    setArticulo(id, index) {
        if(!id){
            this.articulos[index] = this.cleanKeys(this.articulos[index]);
        }else {
            this.articulos[index].codigo = this.item.find(x => x.id == id).codigo;
            this.articulos[index].proveedor_id = this.item.find(x => x.id == id).proveedor_id;
            this.articulos[index].articulo_id = this.item.find(x => x.id == id).articulo_id;
            this.articulos[index].articulo = this.item.find(x => x.id == id).articulo;
            this.articulos[index].marca = this.item.find(x => x.id == id).marca;
            this.articulos[index].modelo = this.item.find(x => x.id == id).modelo;
            this.articulos[index].existencia = this.item.find(x => x.id == id).totalExistencia;
            this.articulos[index].precio = this.item.find(x => x.id == id).precio;
        }
    }

    cleanKeys(Obj: any):any {
        Object.entries(Obj).forEach(([key, value]) => {
            if (key != 'proveedor_id') {
                Obj[key] = null;
            }
        });
        return Obj;
    }

    /**Eliminando la fila creada */
    deleteArticulo(index) {
        this.articulos.splice(index, 1);
        if(this.articulos.length == 0){
            this.item = null;
        }
    }

      /*=============================================================
         GUARDAR EL TRASPASO
      ================================================================== */
    
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
                        this.articulos[c].userorigen = this.requi.porigen_id;
                        
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

    getTotalCost() {
        let precio = this.articulos.map(c => c.precio).reduce((ant, act) => ant + act, 0);
        let cantidad = this.articulos.map(c => c.cantidad).reduce((ant, act) => ant + act, 0);
        return precio * cantidad;
    }

    onCancel() {
        this._router.navigate(['almacen']);
    }

} //END CLASS
