import { Component, OnInit } from '@angular/core';
import { Articulo } from './../../../models/articulo'
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
declare var $: any;

@Component({
    selector: 'articulo-view',
    templateUrl: './view.component.html',
    providers:[
        UserService,
        GeneralCallService
    ]
})

export class ArticuloViewComponent implements OnInit{
    public title: string;
    public status: string;
    public token: any;
    public articulos: Array<Articulo>;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService:GeneralCallService
    ){
        this.title = "Articulos";
        this.token = this._UserService.getToken();
    }

    ngOnInit(){
        //declaracion select component
        $(document).ready(function(){
            $('select').formSelect();
          });//end    
          $(document).ready(function(){
            $('.tooltipped').tooltip();
          }); 
        this.getArticulos();
    }

    getArticulos(){

        this._GeneralCallService.getRecords(this.token,'articulos').subscribe(
            response=>{
                this.articulos = response.articulo;
            },error=>{
                console.log(<any>error);
            }
        );
    }

    deleteRecord(id){
        if(confirm('Eliminar Registro')){
            this._GeneralCallService.delteRcord(this.token,'articulos',id).subscribe(
                response=>{
                    this.getArticulos();
                }
            );
        }
    }

}//EndClass