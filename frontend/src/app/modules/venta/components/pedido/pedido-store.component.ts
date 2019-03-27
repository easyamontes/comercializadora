import { Component, OnInit, ViewChild } from '@angular/core';
import { Router} from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserService } from '../../../../services/user.service';
import {GeneralCallService} from '../../../../services/generalCall.service';
import { Conceptoventa } from './../../../../models/conceptoventa';


import { Pedido } from 'src/app/models/pedido';

@Component ({
       selector: 'pedido-store',
       templateUrl:'./pedido-edit.component.html',
       providers: [
           UserService,
           GeneralCallService
       ]
})

export class PedidoStoreComponent implements OnInit {
     public title: string;
     public token: any;
     public pedi: Pedido;
     public pedidos: MatTableDataSource<Conceptoventa>;
     public conceptoventa: Array<Conceptoventa>;
     public status: any;
     public displayedColumns: string[] = ['codigo','existencia','nombre','cantidad','precio','diferencia','eliminar'];
     public lisart:Array<any>;

     @ViewChild(MatPaginator) paginator: MatPaginator;
     @ViewChild(MatSort) sort: MatSort;
    
    
     constructor (
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router
     ){
         this.title = 'Nuevo Pedido';
         this.conceptoventa = [];
         this.token = this._UserService.getToken();
         this.pedi = new Pedido (0,'',0);
     }
     ngOnInit(){
       this.getVentas();
       this.getListArticulo();
   }//end ngOnInit

      /*==========================================================
        GENERAR LISTA DE ARTICULOS
       =============================================================*/
   getListArticulo(){
    this._GeneralCallService.getRecords(this.token,'almaitem').subscribe(
        response=>{
            this.lisart = response.existencia;
        }
    );
}


setArticulo(id,index){
    this.pedidos.data[index].codigo = this.lisart.find(x=>x.id == id).codigo;
    this.pedidos.data[index].articulo = this.lisart.find(x=>x.id == id).articulo;
    this.pedidos.data[index].marca = this.lisart.find(x=>x.id == id).marca;
    this.pedidos.data[index].modelo = this.lisart.find(x=>x.id == id).modelo;
    this.pedidos.data[index].existencia = this.lisart.find(x=>x.id == id).totalExistencia;
    
}

     /*=============================================================
           AGREGAR CONCEPTO POR CONCEPTO
    ================================================================= */
   addConcepto(){
    let nuevoConcepto = new Conceptoventa(0,this.pedi.id,0,0,'','','','',0,0,0,0,0,0);
    this.conceptoventa.push(nuevoConcepto);
    this.pedidos = new MatTableDataSource (this.conceptoventa);
    this.pedidos.paginator = this.paginator;
    this.pedidos.sort = this.sort;
}
 
        /*=========================================================
           BOTON GUARDAR
        ============================================================ */
   
Guardar(){
    console.log(this.token);
    this._GeneralCallService.storeRecord(this.token,'ventas',this.pedi).subscribe(
        response=>{
            this.pedi = response.pedido;
             console.log(this.pedi)
            this.status = response.status;
                  if(this.status == 'success'){
                    this.conceptoventa.forEach(item=>{
                         item.pedido_id=this.pedi.id
                   })
                   console.log( this.conceptoventa);
        /*==============================================================
           GUARDAR CONCEPTOS INGRESADOS DENTRO DEL BOTON GUARDAR
        ================================================================ */
   
               this._GeneralCallService.storeRecord(this.token,'conceptoventa',this.conceptoventa).subscribe(
                   response =>{
                       console.log (this.conceptoventa);
        /*======================================================================
           GUARDAR CONCEPTOS EN EXISTENCIA INGRESADOS DENTRO DEL BOTON GUARDAR
        ========================================================================= */
   
                    this._router.navigate(['inicio']);
            },error=>{
                      console.log(<any>error);
                    });
            this._router.navigate(['inicio']);
            }
        },error=>{
            console.log(<any>error);
        });
} 

    
          getVentas(){

            this._GeneralCallService.getRecords(this.token,'ventas').subscribe(
                response=>{
                    this.pedidos = response.pedido;
                    this.pedidos = new MatTableDataSource(response.pedido);
                    this.pedidos.paginator = this.paginator;
                    this.pedidos.sort = this.sort;
                },error=>{
                    console.log(<any>error);
                }
            );
        }
    
           /*========================================================
           ELIMINAR REGISTRO DE CONCEPTOS
           ========================================================== */
     
          deleteRecord(index){
                this.pedidos.data.splice(index,1);
                this.pedidos._updateChangeSubscription();
        }

           /*========================================================
           CANCELAR TODO EL REGISTRO CON LOS ARTICULOS
           ==========================================================*/
            
        CancelEdit(){
            this.pedi = null;
            this._router.navigate(['inicio']);
        }
      
}

