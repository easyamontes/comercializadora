import { Component, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserService } from '../../../../services/user.service';
import {GeneralCallService} from '../../../../services/generalCall.service';
import { Almacen } from './../../../../models/almacen';
import { Pedido } from 'src/app/models/pedido';
import { isNgTemplate } from '@angular/compiler';



@Component({
       selector: 'pedido-edit',
       templateUrl: './pedido-edit.component.html',

       providers:[
        UserService,
        GeneralCallService
        ]})

    export class PedidoEditComponent implements OnInit {
         public title:string;
         public status:string;
         public identity:any;
         public token:any;
         public pedi: Pedido;
         public pedidos: MatTableDataSource<Almacen>;
         public conceptoventa: Array<Almacen>;
         public list:Array<any>;
         public displayedColumns: string[] = ['codigo','nombre','diferencia','devolucion'];


         @ViewChild(MatPaginator) paginator: MatPaginator;
         @ViewChild(MatSort) sort: MatSort;

         constructor(
            private _UserService: UserService,
            private _GeneralCallService :GeneralCallService,
            private _route: ActivatedRoute,
            private _router: Router

         ){
            
            this.token=this._UserService.getToken();
            this.pedi = new Pedido (0,'',0,0,'','','',0,null);
            this.conceptoventa = [];
        
            this.title = 'Devolucion';
            this.identity = this._UserService.getIdentity();
         }

        ngOnInit(){
            this._route.params.subscribe(
                   params=>{
                       let id = +params['id'];
                       this.getPedido(id);
                     
                       
                   }
            );
            this.getPremio();
            
            
         }//end ngonit

  /*=======================================================================
     lista de premio
 ============================================================================= */
        getPremio(){
            this._GeneralCallService.getRecords(this.token,'listapremio').subscribe(
                response => {
                    this.list = response.premios;
                }
            )
        }


/*=============================================================================
           LISTA DE PEDIDOS TABLA PEDIDOS
  =============================================================================== */   
         
         getPedido(id){
            this._GeneralCallService.getRecrod(this.token,'ventas',id).subscribe(
                response=>{
                    if(response.status == 'success'){
                        this.pedi = response.pedido;
                        this.pedidos = new MatTableDataSource(response.pedido.articulos);

                    }else{
                        this._router.navigate(['ventas']);
                    }
                },error=>{
                    console.log(<any>error);
                }
            );
         }
         /*=============================================================================
           UPDATE DE TABLA PEDIDOS Y CREACION DE NUEVO REGISTRO PARA LOS CONCEPTOS
         =============================================================================== */   
         Guardar(){
            this.pedi.tipo = "ENTRADA";
             this._GeneralCallService.updateRecord(this.token,'ventas',this.pedi,this.pedi.id).subscribe(
                response=>{
                    this.pedi = response.pedido;
                    console.log(this.pedi)
                   this.status = response.status;
                         if(this.status == 'success'){
                             this.conceptoventa = this.pedidos.data;
                            this._GeneralCallService.updateRecord(this.token,'act',this.pedidos.data,this.pedidos.data[0].id).subscribe(
                              response => {         
                              }   
                            )
                             this.conceptoventa.forEach(item=>{
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
                           this.conceptoventa = this.conceptoventa.filter(function  (obj) {
                               return obj.devolucion > 0;
                               
                           });

                      this._GeneralCallService.storeRecord(this.token,'almaitem',this.conceptoventa).subscribe(
                          response =>{  
                              console.log (this.conceptoventa);
          
                   },error=>{
                             console.log(<any>error);
                           });
                        this   
                   this._router.navigate(['./ventas/welcome']);
                   }
               },error=>{
                    console.log(<any>error);
                
           });
      }

         /*=============================================================================
           BOTON DE CANCELAR EN EL HTML
         =============================================================================== */   
        CancelEdit(){
            this.pedi = null;
            this._router.navigate(['ventas']);
        }
    
    }//end class
