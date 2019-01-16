import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../../models/articulo';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ArticuloService } from './../services/articulo.serice';

@Component({
    selector: 'articulo-store',
    templateUrl: './edit.component.html',
    providers:[
        UserService,
        ArticuloService
    ]
})

export class ArticuloStoreComponent implements OnInit{
    public title:string;
    public status: string;
    public token: any;

    constructor(
        private _UserService: UserService,
        private _ArticuloService: ArticuloService
    ){
        this.title='Nuevo Articulo';
        this.token=this._UserService.getToken();
    }

    ngOnInit(){
    }
}//EndClass