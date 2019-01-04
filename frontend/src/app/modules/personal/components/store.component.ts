import { Component, OnInit } from '@angular/core';
import { Personal } from '../../../models/personal'
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
    public personal: Array<Personal>;

    constructor(
        private _UserService: UserService,
        private _PersonalService :PersonalService
    ){
        this.title = 'Alta de personal';
        this.token = _UserService.getToken();
    }

    ngOnInit(){

    }
}//End class