import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Personal } from './../../../models/personal';
import { UserService } from '../../../services/user.service';
import { GeneralCallService } from '../../../services/generalCall.service';

@Component({
    selector: 'personal-edit',
    templateUrl: './edit.component.html',
    providers:[
        UserService,
        GeneralCallService
    ]
})

export class PersonalEditComponent implements OnInit{
    public title:string;
    public status: string;
    public token: any;
    public persona: Personal;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService :GeneralCallService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.title = 'Editando';
        this.token = this._UserService.getToken();
    }

    /** Toma el parametro del URL id personal*/
    ngOnInit(){
        this._route.params.subscribe(
            params=>{
                let id = +params['id'];
                this.getPersona(id);
            }
        );
    }
    /** busca una persona en la base de datos */
    getPersona(id){
        this._GeneralCallService.getRecrod(this.token,'personal',id).subscribe(
            response=>{
                if(response.status == 'success'){
                    this.persona = response.personal;
                    this.title = "Editar Registro";
                }else{
                    this._router.navigate(['personal']);
                }
            },error=>{
                console.log(<any>error);
            }
        );
    }

    /** Funcion para guardar el formulario de personal */
    onSubmit(form){
        this._GeneralCallService.updateRecord(this.token,'personal',this.persona,this.persona.id).subscribe(
            response=>{
                this._router.navigate(['personal']);
            },error=>{
                console.log(<any>error);
            }
        );
    }

    CancelEdit(){
        this.persona = null;
        this._router.navigate(['personal']);
    }

}//End class