import { Component, OnInit } from '@angular/core';
import { Articulo } from './../../../models/articulo'
import { UserService } from '../../../services/user.service';
import { ArticuloService } from './../services/articulo.serice';

@Component({
    selector: 'articulo-view',
    templateUrl: './view.component.html',
    providers:[
        UserService,
        ArticuloService
    ]
})

export class ArticuloViewComponent implements OnInit{
    public title: string;
    public status: string;
    public token: any;
    public articulos: Array<Articulo>;

    constructor(
        private _UserService: UserService,
        private _ArticuloService:ArticuloService
    ){
        this.title = "Articulos";
        this.token = this._UserService.getToken;
    }

    ngOnInit(){
        this.getArticulos();
    }

    getArticulos(){
        this._ArticuloService.getArticulos(this.token).subscribe(
            response=>{
                this.articulos = response.articulo;
            },error=>{
                console.log(<any>error);
            }
        );
    }

}//EndClass