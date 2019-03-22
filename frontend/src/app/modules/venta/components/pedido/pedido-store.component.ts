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
     public displayedColumns: string[] = ['codigo','nombre','eliminar'];
     public lisart:Array<any>;

     @ViewChild(MatPaginator) paginator: MatPaginator;
     @ViewChild(MatSort) sort: MatSort;
    
    
     constructor (
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router
     ){
         this.title = 'nuevo Pedido';
         this.conceptoventa = [];
         this.token = this._UserService.getToken();
         this.pedi = new Pedido (0,'',0);
     }
     ngOnInit(){
       this.getVentas();
       this.getListArticulo();
   }//end ngOnInit

   getListArticulo(){
    this._GeneralCallService.getRecords(this.token,'lartic').subscribe(
        response=>{
            this.lisart = response.articulos;
        }
    );
}


setArticulo(id,index){
    this.pedidos.data[index].codigo = this.lisart.find(x=>x.id == id).codigo;
    this.pedidos.data[index].articulo = this.lisart.find(x=>x.id == id).nombre;
    this.pedidos.data[index].marca = this.lisart.find(x=>x.id == id).marca;
    this.pedidos.data[index].modelo = this.lisart.find(x=>x.id == id).modelo;

}

   addConcepto(){
    let nuevoConcepto = new Conceptoventa(0,this.pedi.id,0,0,'','','','',0,0,0,0,0);
    this.conceptoventa.push(nuevoConcepto);
    this.pedidos = new MatTableDataSource (this.conceptoventa);
    this.pedidos.paginator = this.paginator;
    this.pedidos.sort = this.sort;
}
 
        /*--------------------------------------------------------
           BOTON GUARDAR
        ---------------------------------------------------------- */
   
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
        /*--------------------------------------------------------
           GUARDAR CONCEPTOS INGRESADOS
        ---------------------------------------------------------- */
   
               this._GeneralCallService.storeRecord(this.token,'conceptoventa',this.conceptoventa).subscribe(
                   response =>{
                       console.log (this.conceptoventa);
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
         botonCancelar(){
            this.pedi = null;
            this._router.navigate(['inicio']);
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
    
           /*--------------------------------------------------------
           ELIMINAR REGISTRO DE CONCEPTOS
           ---------------------------------------------------------- */
     
          deleteRecord(index){
                //this.conceptoventa.data.splice(index,1);
                //this.conceptoventa._updateChangeSubscription();
        }
            
        /*--------------------------------------------------------
           AGREGAR CONCEPTO POR CONCEPTO
        ---------------------------------------------------------- */
  
}

