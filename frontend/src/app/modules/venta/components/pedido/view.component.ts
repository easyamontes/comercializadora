import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
//Servicios
import {UserService} from './../../../../services/user.service';
import {GeneralCallService} from '../../../../services/generalCall.service';
import {Pedido} from'src/app/models/pedido';
import {Busqueda} from 'src/app/models/busqueda';

@Component({
     selector: 'dev-view',
    templateUrl: './view.component.html',
    providers: [
        UserService,
        GeneralCallService,
    ]    
})
export class PedidoViewComponent implements OnInit {

      public token: any;
      public title:any;
      public pedidos :Array<Pedido>;
      public busqueda:Busqueda;

      constructor (
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router
      ){
        this.token = this._UserService.getToken();
        this.title = "Devoluciones";
        this.busqueda = new Busqueda(null, null, null,null);
      }

    ngOnInit() {
      this.getPedidos();  
    }

    getPedidos(){
        this._GeneralCallService.getRecords(this.token,'ventas').subscribe(
            response =>{
                this.pedidos = response.pedidos;
            },error =>{
                console.log(<any>error);  
            }
        );
        
    }

  CancelEdit(){
    this._router.navigate(['./ventas/welcome']);
}    
}