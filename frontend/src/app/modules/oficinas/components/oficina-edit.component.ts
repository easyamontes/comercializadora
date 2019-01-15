import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../../services/user.service';
import { OficinaService } from './../services/oficina.service';
import { Oficina} from 'src/app/models/oficina';

@Component({
    selector: 'oficina',
    templateUrl: './oficina-edit.component.html',
    providers: [
        UserService,
        OficinaService,
    ]
})
export class OficinaEditComponent implements OnInit
{
     public title:string;
     public user: User;
     public status: string;
     public token;
     public ofi: Oficina;
     constructor (
           private _UserService: UserService,
           private _OficinaService: OficinaService,
           private _route: ActivatedRoute,
           private _router: Router
      ){
        this.token = _UserService.getToken();
      }
      ngOnInit(){
          this._route.params.subscribe(
              params =>{
                  let id= +params['id'];
                  this.getOficina(id);
              }
          );
      }

      getOficina(id){
          this._OficinaService.getOficina(this.token, id).subscribe(
              response=>{
                  if(response.status == 'success'){
                      this.ofi = response.nombre;
                      this.title = 'Editar Oficina: '+ this.ofi.nombre;
                  }else{
                      this._router.navigate(['oficinas']);
                  }
              },error=>{
                  console.log(<any>error);
              }
          );
      }

      onSubmit(form){
          this._OficinaService.updateOficina(this.token,this.ofi,this.ofi.id).subscribe(
              response=>{
                  this._router.navigate(['oficinas']);
              },error=>{
                  console.log(<any>error);
              }
          );
      }

}//end class
