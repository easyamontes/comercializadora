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
     public displayedColumns: string[] = ['articulo','eliminar'];
     @ViewChild(MatPaginator) paginator: MatPaginator;
     @ViewChild(MatSort) sort: MatSort;
    
    
     constructor (
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router
     ){
         this.title = 'nuevo Pedido';
         //this.conceptoventa = [];
         this.token = this._UserService.getToken();
         this.pedi = new Pedido (0,'',0);
     }
     ngOnInit(){
       
   }//end ngOnInit
 
   addConcepto(){
    let nuevoConcepto = new Conceptoventa(0,this.pedi.id,0,0,'','','','',0,0,0,0,0);
    this.conceptoventa.push(nuevoConcepto);
    this.pedidos = new MatTableDataSource (this.conceptoventa);
}
Guardar(){
    console.log(this.token);
    this._GeneralCallService.storeRecord(this.token,'ventas',this.pedi).subscribe(
        response=>{
            this.pedi = response.pedis;
            this.status = response.status;
            if(this.status == 'success'){
               /*   this.conceptoventa.forEach(item=>{
                    item.pedido_id=this.pedi.id
                    })*/
                //Mandando los conceptos a guardar
               this._GeneralCallService.storeRecord(this.token,'conceptoventa',this.conceptoventa).subscribe(
                   response =>{
                      console.log(<any>response);
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
/* 
          getArticulos(){

            this._GeneralCallService.getRecords(this.token,'articulos').subscribe(
                response=>{
                    this.pedidos = response.pedidos;
                    this.pedidos = new MatTableDataSource(response.pedidos);
                    this.pedidos.paginator = this.paginator;
                    this.pedidos.sort = this.sort;
                },error=>{
                    console.log(<any>error);
                }
            );
        }
    

          deleteRecord(id){
            if(confirm('Eliminar Registro')){
                this._GeneralCallService.delteRcord(this.token,'pedidos',id).subscribe(
                    response=>{
                        this.getArticulos();
                    }
                );
            }
        }*/
     
}

