import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router,ActivatedRoute } from '@angular/router';
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
    public params:number;
    public status:string;
    public token:any;
    public identity:any;
    public rurl:string[];
    public requi:Requisicion;
    public item: Array<Almacen>;
    public displayedColumns: string[];
    public articulos: MatTableDataSource<Almacen>;
    public provlist:Array<any>;
    public artilist:Array<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _ActivatedRoute: ActivatedRoute,
        private _router: Router
    ){
        this._ActivatedRoute.params.subscribe(
            params=>{
                this.params = +params['sure'];
            });
        let fe = new Date(); 
        let date:string =  fe.toISOString();
        this.identity = this._UserService.getIdentity();
        if(this.params==1){
            this.title='Nuevo Traspaso';
            this.rurl = ["personal","almaitem"];
            this.requi = new Requisicion(0,this.identity.per,0,0,0,"TRASPASO",'NUEVO',0,date,null,null,null);
            this.displayedColumns = ['codigo', 'nombre','existencia','cantidad','precio','total','actions'];
        }else{
            this.title = 'Nueva Compra';
            this.rurl =["lproved","lartic"];
            this.requi = new Requisicion(0,this.identity.per,0,0,0,"COMPRA",'NUEVO',0,date,null,null,null);
            this.displayedColumns = ['codigo', 'nombre','cantidad','precio','total','actions'];
        }
        this.token = this._UserService.getToken();
        this.item=[];
    }

    ngOnInit(){
        this.getListForSelect();
        this. getListArticulo();
    }

    /**invoca la de proveedores  */
    getListForSelect(){
        this._GeneralCallService.getRecords(this.token,this.rurl[0]).subscribe(
            response=>{
                if(this.params==1){
                    this.provlist = response.personal;
                }else{
                    this.provlist = response.proveedorll;
                }
            }
        );
    }

    /**invoca la de articuo (como objetos)*/
    getListArticulo(){
        this._GeneralCallService.getRecords(this.token,this.rurl[1]).subscribe(
            response=>{
                if (this.params==1) {
                    this.artilist = response.existencia;
                }else{
                    this.artilist = response.articulos;
                }
            }
        );
    }

    /**refresca la seleccion del articulo segun la seleccion*/
    setArticulo(id,index){
        this.articulos.data[index].codigo = this.artilist.find(x=>x.id == id).codigo;
        this.articulos.data[index].articulo = this.artilist.find(x=>x.id == id).articulo;
        this.articulos.data[index].marca = this.artilist.find(x=>x.id == id).marca;
        this.articulos.data[index].modelo = this.artilist.find(x=>x.id == id).modelo;
        this.articulos.data[index].costo = this.artilist.find(x=>x.id == id).costo;
        if(this.params == 1){
            this.articulos.data[index].proveedor_id = this.artilist.find(x=>x.id == id).proveedor_id;
            this.articulos.data[index].costo = this.artilist.find(x=>x.id == id).costo;
            this.articulos.data[index].existencia = this.artilist.find(x=>x.id == id).cantidad * -1;
        }
        this.articulos.data[index].totalExistencia = this.artilist.find(x=>x.id == id).totalExistencia;
        console.log(this.articulos.data);
    }

    /**crea una nueva fila en la tabla de Articulos */
    createArticulo(){
        if(this.requi.proveedor_id || this.requi.pdestino_id){
            let nitem = new Almacen(0,0,0,this.requi.proveedor_id,null,null,null,null,null,null,null,null,null,null,null);
            this.item.push(nitem);
            this.articulos = new MatTableDataSource(this.item);
            this.articulos.paginator = this.paginator;
            this.articulos.sort = this.sort;
            this.requi.importe = this.getTotalCost();
        }
    }

    /**Eliminando la fila creada */
    deleteArticulo(index){
        this.articulos.data.splice(index,1);
        this.articulos._updateChangeSubscription();
    }


    onSubmit(){
        this.requi.importe = this.getTotalCost();
        if(this.requi.pdestino_id == 0){
            this.requi.pdestino_id = this.identity.sub;
        }
        this._GeneralCallService.storeRecord(this.token,'requisicion',this.requi).subscribe(
            response=>{
                if (response.code == 200) {
                    this.requi = response.requisicion;
                    for(var c = 0 ; c < this.articulos.data.length ; c++ ){
                       this.articulos.data[c].total = this.articulos.data[c].cantidad * this.articulos.data[c].precio;
                       this.articulos.data[c].requisicion_id = this.requi.id;
                       this.articulos.data[c].userp_id = this.requi.pdestino_id;
                    }
                    this._GeneralCallService.storeRecord(this.token,'almaitem',this.articulos.data).subscribe(
                        response=>{
                            this._router.navigate(['almacen']);
                        },error=>{
                            console.log(<any>error);
                        });
                }
            },error=>{
                console.log(<any>error);
            });
    }
    
    onCancel(){
        this._router.navigate(['almacen']);
    }

    getTotalCost(){
        return this.articulos.data.map(c=>c.precio).reduce((ant,act)=>ant+act,0);
    }

}//End Class