import { Component, OnInit } from '@angular/core';
import { Articulo } from '../../../models/articulo';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';

@Component({
    selector: 'articulo-store',
    templateUrl: './edit.component.html',
    providers:[
        UserService,
        GeneralCallService
    ]
})

export class ArticuloStoreComponent implements OnInit{
    public title:string;
    public status: string;
    public token: any;
    public articuloe: Articulo;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router
    ){
        this.title='Nuevo Articulo';
        this.token=this._UserService.getToken();
    }

    ngOnInit(){
        this.articuloe = new Articulo(0,'','','','','','');
    }

    onSubmit(form){
        this._GeneralCallService.storeRecord(this.token,'articulos',this.articuloe).subscribe(
            response=>{
                this.articuloe = response.articulo;
                this.status = response.status;
                if(this.status == 'success'){
                    this._router.navigate(['articulos']);
                }
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