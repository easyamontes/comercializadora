import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from '../../../../services/user.service';
import {GeneralCallService} from '../../../../services/generalCall.service';

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
     public status: any;
    
     constructor (
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router
     ){
         this.title = 'nuevo Pedido';
         this.token = this._UserService.getToken();
     }
     ngOnInit(){
        this.pedi = new Pedido ( 0 ,'',0);
        this.title ='Nuevo Pedido';
   }//end ngOnInit

   onSubmit(form){
          this._GeneralCallService.storeRecord(this.token,'ventas',this.pedi).subscribe(
             response =>{
               this.pedi = response.pedido;
               this.status = response.status;
                   if(this.status == 'success'){
                      this._router.navigate(['inicio']);
                  }else {
                      this.status = 'Response Error'
                  }
            },error =>{
              console.log(<any>error);
               this.status = <any>error;
           });
         }//end onSubmit

         botonCancelar(){
            this.pedi = null;
            this._router.navigate(['inicio']);
          }
      
}