import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
//Modelos
import { Almacen } from './../../../../models/almacen';
//Servicios
import { UserService } from '../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';


@Component({
    selector: 'diario-view',
    templateUrl: './view.component.html',
    providers:[
        UserService,
        GeneralCallService
    ]
})

export class DiarioViewComponent implements OnInit{
    public title: string;
    public token: any;
    public almacen: Array<any>;

    constructor(
        private _UserService:UserService
    ){
        this.token = this._UserService.getToken();
    }

    ngOnInit(){
        
    }


}//End Class