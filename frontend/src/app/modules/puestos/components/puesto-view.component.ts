import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import { Puesto } from 'src/app/models/puesto';

@Component({
    selector: 'puestos',
    templateUrl: './puesto-view.component.html',
    providers: [
        UserService,
        GeneralCallService, 
    ]
})

export class PuestoViewComponent implements OnInit{
    public title: string;
    public user: User;
    public status: string;
    public token;
    public puestos: Array<Puesto>;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService
    ){
        this.title = 'Organizacion';
        this.token = this._UserService.getToken();
    }

    ngOnInit(){
        this.getPuestos();
    }

    //llamado el lisrado de los puertos
    getPuestos(){
        this._GeneralCallService.getRecords(this.token,'puestos').subscribe(
            response =>{
                this.puestos = response.puestos;
            },error =>{
                console.log(<any>error);
            });
    }

    deltetePuesto(id){
        if(confirm('Seguro que desea eliminar este registro?')){
            this._GeneralCallService.delteRcord(this.token,'puestos',id).subscribe(
                response=>{
                    this.getPuestos();
                },error=>{
                    console.log(<any>error);
                }
            )
        }
    }




}//END Class