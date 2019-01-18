import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import { Oficina} from 'src/app/models/oficina';

@Component({
      selector: 'oficinas',
      templateUrl: './oficina-view.component.html',
      providers:[
        UserService,
        GeneralCallService
      ]
})

   export class OficinaViewComponent implements OnInit{
      public title: string;
      public status: string;
      public token;
      public oficinas: Array <Oficina>;

      constructor (
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router
      ){
        this.title = 'Oficinas';
        this.token = this._UserService.getToken();
      }

     ngOnInit(){
         this.getOficinas();
        }

      getOficinas(){
       this._GeneralCallService.getRecords(this.token,'oficinas').subscribe(
            response =>{
               this.oficinas = response.oficinas;
             },error=>{
               console.log(<any>error);
             });
        }

     delteteOficina(id){
          if (confirm('seguro que desea eliminar esta oficina')){
            this._GeneralCallService.delteRcord(this.token,'oficinas',id).subscribe(
              response=>{
                this.getOficinas();
              },error=>{
                console.log(<any>error);
              }
            )
          }

      }

   }//end class export
