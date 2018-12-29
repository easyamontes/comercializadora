import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { PuestoService } from '../../services/puesto.service';
import { Puesto } from 'src/app/models/puesto';

@Component({
    selector: 'puesto',
    templateUrl: './puesto-edit.component.html',
    providers: [
        UserService,
        PuestoService, 
    ]
})

export class PuestoEditComponent implements OnInit{
    public title: string;
    public user: User;
    public status: string;
    public token;
    public puestoe: Puesto;

    constructor(
        private _UserService: UserService,
        private _PuestoService: PuestoService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.token = _UserService.getToken();
    }

    ngOnInit(){
        this._route.params.subscribe(
            params =>{
                let id= +params['id'];
                this.getPuesto(id);
            }
        );
    }

    //obteniendo registro buscado
    getPuesto(id){
        this._PuestoService.getPuesto(this.token, id).subscribe(
            response=>{
                if(response.status == 'success'){
                    this.puestoe = response.puesto;
                    this.title = 'Editar Puesto: '+ this.puestoe.puesto;
                }else{
                    this._router.navigate(['puestos']);
                }
            },error=>{
                console.log(<any>error);
            }
        );
    }

    onSubmit(form){
        this._PuestoService.updatePuesto(this.token,this.puestoe,this.puestoe.id).subscribe(
            response=>{
                if(response.status){
                    this._router.navigate(['puestos']);
                }
            },error=>{
                console.log(<any>error);
            }
        );
    }



}//end Class