import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { Conceptoventa } from './../../../../models/conceptoventa';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import {GeneralCallService} from '../../../../services/generalCall.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
@Component ({
    selector: 'pedido-edit',
    templateUrl: './pedido-edit.component.html',
    providers: [
        UserService,
        GeneralCallService
    ]
})

export class PedidoEditComponent implements OnInit {
      
    public title: string;
    public token: any;
    public status: string;
    public pedi: Pedido;
    public conceptoventa: Array<Conceptoventa>;
    public pedidos: MatTableDataSource<Conceptoventa>;

    constructor(
        private _UserService: UserService,
        private _route: ActivatedRoute,
        private _GeneralCallService: GeneralCallService,
        private _router: Router
    ){
        this.title ="Editar pedido";
        this.token = this._UserService.getToken();
    }

     
    ngOnInit(){
        this._route.params.subscribe(
            params=>{
                let id = +params['id'];
                this.getPedido(id);
            });
        }

    getPedido(id){
        this._GeneralCallService.getRecrod(this.token,'ventas',id).subscribe(
            response=>{
                if(response.status == 'success'){
                    this.pedi = response.pedido;
                    if(response.pedido.conceptoventa){
                        this.conceptoventa = response.pedido.conceptoventa;
                    }else{
                        this.conceptoventa = [];
                    }     
                }else{
                    this._router.navigate(['inicio']);
                }
            },error=>{
                console.log(<any>error);
            });

    }

         /**Funcion que agrega un nuevo concepto al array */
    addConcepto(){
        let nuevoConcepto = new Conceptoventa(0,this.pedi.id,0,0,'','','','',0,0,0,0,0);
        this.conceptoventa.push(nuevoConcepto);
        this.pedidos = new MatTableDataSource (this.conceptoventa);
    }

    /**Funcionpara eliminar el contacto */
    deleteContacto(i,){
        this.conceptoventa.splice(i,1);
    }

   
    
    Guardar(){
        this._GeneralCallService.updateRecord(
        this.token,'ventas',this.pedi,this.pedi.id).subscribe(
            response=>{
                this.pedi = response.pedi;
                this.status = response.status;
                if(this.status == 'success'){
                    // Mandando los conceptos a guardar
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

    cancelEdit(){
        this.pedi = null;
        this._router.navigate(['inicio']);
    }
}