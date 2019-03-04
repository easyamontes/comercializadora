import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
//servicios
import { UserService } from './../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';
//Modelos
import { Requisicion } from '../../../../models/requisicion';
import { Almacen } from './../../../../models/almacen';

@Component({
    selector: 'requi-store',
    templateUrl: './store.component.html',
    providers:[
        UserService,
        GeneralCallService
    ]
})


export class RequisicionStoreComponent implements OnInit{
    public title:string;
    public status:string;
    public token:any;
    public requi:Requisicion;
    public item: Array<Almacen>;
    public displayedColumns: string[] = ['codigo', 'nombre','cantidad','precio','total'];
    public articulos: MatTableDataSource<Almacen>;
    public provlist:Array<any>;
    public artilist:Array<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router
    ){
        let date:Date = new Date();        
        this.token = this._UserService.getToken();
        this.item=[];
        this.requi = new Requisicion(0,0,0,0,0,'COMPRA','NUEVO',0,date,null,null,null);
    }

    ngOnInit(){
        this.getListProve();
        this. getListArticulo()
    }

    /**invoca la de proveedores  */
    getListProve(){
        this._GeneralCallService.getRecords(this.token,'lproved').subscribe(
            response=>{
                this.provlist = response.proveedorll;
            }
        );
    }

    /**invoca la de articuo (como objetos)*/
    getListArticulo(){
        this._GeneralCallService.getRecords(this.token,'lartic').subscribe(
            response=>{
                this.artilist = response.articulos;
            }
        );
    }

    /**refresca la seleccion del articulo segun la seleccion*/
    setArticulo(id,index){
        this.articulos.data[index].codigo = this.artilist.find(x=>x.id == id).codigo;
        this.articulos.data[index].articulo = this.artilist.find(x=>x.id == id).nombre;
        this.articulos.data[index].marca = this.artilist.find(x=>x.id == id).marca;
        this.articulos.data[index].modelo = this.artilist.find(x=>x.id == id).modelo;
    }

    createArticulo(){
        let nitem = new Almacen(0,0,this.requi.proveedor_id,null,null,null,null,null,null,null,null,null);
        this.item.push(nitem);
        this.articulos = new MatTableDataSource(this.item);
        this.articulos.paginator = this.paginator;
        this.articulos.sort = this.sort;
    }

}//End Class