import { Component, OnInit } from '@angular/core';
import { Personal } from '../../../models/personal';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import {GeneralListService} from '../../../services/generalList.service';

@Component({
    selector: 'personal-store',
    templateUrl: './edit.component.html',
    providers:[
        UserService,
        GeneralCallService,
        GeneralListService
    ]
})

export class PersonalStoreComponent implements OnInit{
    public title:string;
    public status: string;
    public token: any;
    public persona: Personal;
    public selectList: any;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService :GeneralCallService,
        private _GeneralListService: GeneralListService,
        private _router: Router
    ){
        this.title = 'Alta de personal';
        this.token = this._UserService.getToken();
    }

    ngOnInit(){
        this.persona = new Personal(0,0,'','','','','','','','','','','','','');
        this.getOptions();
    }

    getOptions(){
        this._GeneralListService.getListEmpleado(this.token,'lpuesto').subscribe(
           response=>{
               this.selectList = response.puestol;
           }
       );
       }

    onSubmit(form){
        this._GeneralCallService.storeRecord(this.token,'personal',this.persona).subscribe(
            response=>{
                this.persona = response.personal;
                this.status = response.status;
                if(this.status == 'success'){
                    this._router.navigate(['personal'])
                }
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