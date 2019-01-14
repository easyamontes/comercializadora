import { Component, OnInit } from '@angular/core';
import { Personal } from '../../../models/personal';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { PersonalService } from '../services/personal.service';

@Component({
    selector: 'personal-store',
    templateUrl: './edit.component.html',
    providers:[
        UserService,
        PersonalService
    ]
})

export class PersonalStoreComponent implements OnInit{
    public title:string;
    public status: string;
    public token: any;
    public persona: Personal;

    constructor(
        private _UserService: UserService,
        private _PersonalService :PersonalService,
        private _router: Router
    ){
        this.title = 'Alta de personal';
        this.token = this._UserService.getToken();
    }

    ngOnInit(){
        this.persona = new Personal(0,'','','','','','','','','','','','','');
    }

    onSubmit(form){
        this._PersonalService.storePersonal(this.token,this.persona).subscribe(
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