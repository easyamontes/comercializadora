import { Component, OnInit } from '@angular/core';
import { Personal } from './../../../models/personal'
import { UserService } from '../../../services/user.service';
import { PersonalService } from './../services/personal.service';

@Component({
    selector: 'personal-view',
    templateUrl: './view.component.html',
    providers:[
        UserService,
        PersonalService
    ]
})

export class PersonalViewComponent implements OnInit{
    public title:string;
    public status: string;
    public token: any;
    public personal: Array<Personal>;

    constructor(
        private _UserService: UserService,
        private _PersonalService :PersonalService
    ){
        this.title = 'Personal';
        this.token = _UserService.getToken();
    }

    ngOnInit(){
        this.getPersonal();
    }

    getPersonal(){
        this._PersonalService.getPersonal(this.token).subscribe(
            response=>{
                this.personal = response.personal;
            },error=>{
                console.log(<any>error);
            });
    }

    deletePersona(id){
        if(confirm('Eliminar este registro?')){
            this._PersonalService.deltePersona(this.token,id).subscribe(
                response=>{
                    this.getPersonal();
                },error=>{
                    console.log(<any>error);
                }
            );
        }
    }

}//End Class