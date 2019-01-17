import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { Articulo } from './../../../models/articulo'
import { UserService } from '../../../services/user.service';
import { ArticuloService } from './../services/articulo.serice';

@Component({
    selector: 'articulo-edit',
    templateUrl: './edit.component.html',
    providers:[
        UserService,
        ArticuloService
    ]
})

export class ArticuloEditComponent implements OnInit{
    public title:string;
    public status: string;
    public token: any;
    public articuloe: Articulo;

    constructor(
    private _UserService: UserService,
    private _ArticuloService :ArticuloService,
    private _route: ActivatedRoute,
    private _router: Router
    ){
        this.title="Editando";
        this.token=this._UserService.getToken();
    }

    ngOnInit(){
        this._route.params.subscribe(
            params=>{
                let id = +params['id'];
                this.getArticulo(id);
            }
        );
    }

    getArticulo(id){
        this._ArticuloService.getArticulo(this.token,id).subscribe(
            response=>{
                if(response.status == 'success'){
                    this.articuloe = response.articulo;
                }else{
                    this._router.navigate(['articulos']);
                }
            },error=>{
                console.log(<any>error);
            }
        );
    }

    onSubmit(form){
        this._ArticuloService.updateArticulo(this.token,this.articuloe,this.articuloe.id).subscribe(
            response=>{
                this._router.navigate(['articulos']);
            },error=>{
                console.log(<any>error);
            }
        );
    }

    cancelEdit(){
        this.articuloe = null;
        this._router.navigate(['articulos']);
    }

}//EndClass