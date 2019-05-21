import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import {GeneralListService} from '../../../services/generalList.service';
import { Oficina} from 'src/app/models/oficina';

@Component({
    selector: 'oficina',
    templateUrl: './oficina-visual.component.html',
    providers: [
        UserService,
        GeneralCallService,
        GeneralListService
    ]
})
export class OficinaVisualComponent implements OnInit
{
     public title:string;
     public user: User;
     public status: string;
     public token;
     public ofi: Oficina;
     public selectList: Array<any>;


     constructor (
           private _UserService: UserService,
           private _GeneralCallService: GeneralCallService,
           private _GeneralListService: GeneralListService,
           private _route: ActivatedRoute,
           private _router: Router
      ){
        this.token = this._UserService.getToken();
      }
      ngOnInit(){
          this._route.params.subscribe(
              params =>{
                  let id = +params['id'];
                  this.getOficina(id);
              }
          );
          this.getOptions();
      }
       //buscar una oficina
      getOficina(id){
          this._GeneralCallService.getRecrod(this.token,'oficinas',id).subscribe(
              response=>{
                  if(response.status == 'success'){
                      this.ofi = response.oficina;
                      this.title = 'Editar Oficina:';
                  }else{
                      this._router.navigate(['oficinas']);
                  }
              },error=>{
                  console.log(<any>error);
              }
          );
      }

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
          this._GeneralCallService.updateRecord(this.token,'oficinas',this.ofi,this.ofi.id).subscribe(
              response=>{
                  this._router.navigate(['oficinas']);
              },error=>{
                  console.log(<any>error);
              }
          );
      }

      botonCancelar(){
           this.ofi = null;
           this._router.navigate(['oficinas']);
     }

}//end class
