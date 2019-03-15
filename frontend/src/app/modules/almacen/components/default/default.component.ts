import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//servicios
import { UserService } from './../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';
//Modelos
import { Almacen } from './../../../../models/almacen';

@Component({
    selector: 'almacen-default',
    templateUrl:'./default.component.html',
    providers:[
        UserService,
        GeneralCallService
    ]
})

export class AlmacenDefaultComponent implements OnInit{
    public title:string;
    public token:any;
    public nalma:any;
    
    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router
    ){
        this.token = this._UserService.getToken();
    }


    ngOnInit(){
        this.getCompras();
    }

    /**Funcion para traer el total de compras nuevas */
    getCompras(){
        this._GeneralCallService.getRecords(this.token,'requisicion').subscribe(
            response=>{
                let res;
                res = response.requisicion;
                this.nalma = res.length;
            },error=>{
                console.log(<any>error);
            });
    }
}