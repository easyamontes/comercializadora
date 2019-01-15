import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../../services/user.service';
import { OficinaService } from './../services/oficina.service';
import { Oficina} from 'src/app/models/oficina';

@Component({
      selector: 'oficinas',
      templateUrl: './oficina-view.component.html',
      providers:[
        UserService,
        OficinaService,

      ]
})

   export class OficinaViewComponent implements OnInit{
      public title: string;
      public user: User;
      public status: string;
      public token;
      public oficinas: Array <Oficina>;

      constructor (
        private _UserService: UserService,
        private _OficinaService: OficinaService,
        private _route: ActivatedRoute,
        private _router: Router
      ){
        this.title = 'Oficinas';
        this.token = _UserService.getToken();
      }

     ngOnInit(){
         this.getOficinas();
        }

      getOficinas(){
       this._OficinaService.getOficinas(this.token).subscribe(
            response =>{
               this.oficinas = response.oficinas;
             },error=>{
               console.log(<any>error);
             });
        }

     delteteOficina(id){
          if (confirm('seguro que desea eliminar esta oficina')){
            this._OficinaService.delteOficina(this.token,id).subscribe(
              response=>{
                this.getOficinas();
              },error=>{
                console.log(<any>error);
              }
            )
          }

      }

   }//end class export
