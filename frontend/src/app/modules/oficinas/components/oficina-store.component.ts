import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import {GeneralListService} from '../../../services/generalList.service';
import { Oficina} from 'src/app/models/oficina';

@Component ({
   selector: 'oficina-store',
   templateUrl: './oficina-edit.component.html',
   providers: [
      UserService,
      GeneralCallService,
      GeneralListService
   ]
})

 export class OficinaStoreComponent implements OnInit{
    public title: string;
    public status_oficina: any;
    public token: any;
    public ofi: Oficina;
    public selectList: Array<any>;


   constructor (
     private _UserService: UserService,
     private _GeneralCallService: GeneralCallService,
     private _GeneralListService: GeneralListService,
     private _router: Router
         ){
           this.title ='Nueva Oficina';
           this.token = this._UserService.getToken();
         }

     ngOnInit(){
          this.ofi = new Oficina ( 0,0,'','','','','','','','','','');
          this.title ='Nueva Oficina';
          this.getOptions();
     }//end ngOnInit

     getOptions(){
      this._GeneralListService.getListEmpleado(this.token,'lpersonal').subscribe(
         response=>{
             this.selectList = response.personall;
         }
     );
     }

     setEncargado(id){
      this.ofi.encargado=this.selectList.find(x=>x.id == id).nombre;
      }

     onSubmit(form){
        this._GeneralCallService.storeRecord(this.token,'oficinas',this.ofi).subscribe(
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

    botonCancelar(){
      this.ofi = null;
      this._router.navigate(['oficinas']);
    }

}//end class OficinaStoreComponent
