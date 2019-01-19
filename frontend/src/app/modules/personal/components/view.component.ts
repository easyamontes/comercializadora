import { Component, OnInit } from '@angular/core';
import { Personal } from './../../../models/personal'
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';

@Component({
    selector: 'personal-view',
    templateUrl: './view.component.html',
    providers:[
        UserService,
        GeneralCallService
    ]
})

export class PersonalViewComponent implements OnInit{
    public title:string;
    public status: string;
    public token: any;
    public personal: Array<Personal>;

    constructor(
        private _UserService: UserService,
        private GeneralCallService :GeneralCallService
    ){
        this.title = 'Personal';
        this.token = _UserService.getToken();
    }

    ngOnInit(){
        this.getPersonal();
    }

    getPersonal(){
        this.GeneralCallService.getRecords(this.token,'personal').subscribe(
            response=>{
                this.personal = response.personal;
            },error=>{
                console.log(<any>error);
            });
    }

    deletePersona(id){
        if(confirm('Eliminar este registro?')){
            this.GeneralCallService.delteRcord(this.token,'personal',id).subscribe(
                response=>{
                    this.getPersonal();
                },error=>{
                    console.log(<any>error);
                }
            );
        }
    }

}//End Class