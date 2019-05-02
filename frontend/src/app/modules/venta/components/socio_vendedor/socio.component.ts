import { Component, OnInit, ViewChild } from '@angular/core';
import { MatListItem, MatListModule } from '@angular/material';
import { Router } from '@angular/router';
//Servicios
import { UserService } from './../../../../services/user.service';
import {GeneralCallService} from '../../../../services/generalCall.service';
import { Almacen } from './../../../../models/almacen';


@Component({
    selector: 'ven-view',
    templateUrl: './socio.component.html',
    providers: [
        UserService,
        GeneralCallService
    ]
})

export class SocioComponent implements OnInit {

    public token: any;
    public title: any;
    public vent:Array<Almacen>;


    constructor(
        private _UserService: UserService,
        private _router: Router,
        private _GeneralCallService: GeneralCallService,
    ) {
        this.token = this._UserService.getToken();
        this.title = "Socio Vendedor";
    }

    ngOnInit() {

        this.lisventa();

    }

    lisventa (){
        this._GeneralCallService.getRecords(this.token,'lisventa').subscribe(
            response=>{
                this.vent = response.almacen;
               console.log('lisventa');
            }
        )
    }

    CancelEdit() {
        this._router.navigate(['./ventas/welcome']);
    }
}