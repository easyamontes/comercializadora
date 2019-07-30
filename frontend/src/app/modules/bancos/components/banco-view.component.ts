import { Component, OnInit} from '@angular/core';
import { Banco} from './../../../models/banco';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import { Router } from '@angular/router';
import { Busqueda} from 'src/app/models/busqueda';

@Component({
    selector: 'banco-view',
    templateUrl:'./banco-view.component.html',
    styleUrls:['./estilo.component.css'],
    providers:[
        UserService,
        GeneralCallService
    ]
})

export class BancosViewComponent implements OnInit{
         public title: string;
         public status: string;
         public token: any;
         public bancos: Array<Banco>;
         public busqueda:Busqueda;

   constructor(
       private _UserService: UserService,
       private _GeneralCallService:GeneralCallService,
       private _router: Router
   ){
    this.title = "Bancos";
    this.token = this._UserService.getToken();
    this.busqueda = new Busqueda(null, null, null);
    }

    ngOnInit(){
        this.getBancos();
    }
        /*==============================================================================
            LLAMADO DEL LISTADO DE BANCO
        ===============================================================================*/
        getBancos(){
        this._GeneralCallService.getRecords(this.token,'bancos').subscribe(
            response =>{
                this.bancos = response.bancos;
            },error=>{
                console.log(<any>error);
            }
        );
    }

    delBanco(id){
        if(confirm('Seguro que desea eliminar este banco?')){
            this._GeneralCallService.delteRcord(this.token,'bancos',id).subscribe(
                response=>{
                    this.getBancos();
                },error=>{
                    console.log(<any>error);
                }
            )
        }
    }

}// end class