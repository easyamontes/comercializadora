import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../../services/user.service';
import { OficinaService } from './../services/oficina.service';
import { Oficina} from 'src/app/models/oficina';

@Component ({
   selector: 'oficina-store',
   templateUrl: './oficina-edit.component.html',
   providers: [
      UserService,
      OficinaService
   ]
})

 export class OficinaStoreComponent implements OnInit{
           public title: string;
           public user: User;
           public status_oficina: any;
           public token: any;
           public ofi: Oficina;

   constructor (
     private _UserService: UserService,
     private _OficinaService: OficinaService,
     private _route: ActivatedRoute,
     private _router: Router
         ){
           this.title ='Nueva Oficina';
           this.token = _UserService.getToken();
         }

     ngOnInit(){
          this.ofi = new Oficina ( 0,'','','','','','','','','','');
           console.log('ingresado');
     }//end ngOnInit

     onSubmit(form){
        this._OficinaService.storeOficina(this.token,this.ofi).subscribe(
          response =>{
          this.ofi = response.oficina;
          this.status_oficina = response.status;
          if(this.status_oficina == 'success'){
           this._router.navigate(['oficinas']);
         }else {
            this.status_oficina = 'Response Error'
         }
       },error =>{
         console.log(<any>error);
         this.status_oficina = <any>error;
          });
    }//end onSubmit

 }//end class OficinaStoreComponent
