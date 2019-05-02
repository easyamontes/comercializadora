import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import { Puesto } from 'src/app/models/puesto';

@Component({
    selector: 'puesto',
    templateUrl: './puesto-edit.component.html',
    providers: [
        UserService,
        GeneralCallService
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
        private _GeneralCallService: GeneralCallService,
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
        this._GeneralCallService.getRecrod(this.token,'puestos', id).subscribe(
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
        this._GeneralCallService.updateRecord(this.token,'puestos',this.puestoe,this.puestoe.id).subscribe(
            response=>{
                this._router.navigate(['puestos']);
                },error=>{
                console.log(<any>error);
            }
        );
    }
    
    cancelEdit(){
        this._router.navigate(['puestos']);
    }

}//end Class
