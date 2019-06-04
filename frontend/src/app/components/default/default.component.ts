import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
    selector: 'default',
    templateUrl: './default.component.html',
    providers: [
        UserService
    ]
})

export class DefaultComponent implements OnInit{
    public title: string;
    public token: any;

    constructor(
        private _UserService: UserService,
        private _route: ActivatedRoute,
        private _router: Router
    ){
        this.title = 'Bienvenido a OUDEDE';
        this.token = _UserService.getToken();
    }
    ngOnInit(){

    }

}