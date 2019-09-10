import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Almacen } from './../../../../models/almacen';
import { UserService } from '../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';
import { Busqueda} from 'src/app/models/busqueda';
@Component({
    selector: 'existencia-view',
    templateUrl: './listview.component.html',
    providers:[
        UserService,
        GeneralCallService
    ]
})

export class ExistenciaViewComponent implements OnInit{
    public title: string;
    public token: any;
    public articulos: Array<Almacen>;
    public busqueda:Busqueda;
    // interfaces para la paginacion de la tabla
    constructor(
        private _UserService:UserService,
        private _GeneralCallService:GeneralCallService
    ){
        this.title = "Existencia";
        this.token = this._UserService.getToken();
        this.busqueda = new Busqueda(null, null, null,null);
    }

    ngOnInit(){
        this.getExistencias();
    }


    getExistencias(){
        this._GeneralCallService.getRecords(this.token,'almaitem').subscribe(
            response=>{
                this.articulos = response.existencia;
            },error=>{
                console.log(<any>error);
            }
        )
    }

}//End Class