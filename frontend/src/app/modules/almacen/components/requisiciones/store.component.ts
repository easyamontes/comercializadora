import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
//servicios
import { UserService } from './../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';
//Modelos
import { Requisicion } from '../../../../models/requisicion';
import { Articulo } from './../../../../models/articulo';

@Component({
    selector: 'requi-store',
    templateUrl: './store.component.html',
    providers:[
        UserService,
        GeneralCallService
    ]
})

export class RequisicionStoreComponent implements OnInit{
    public title:string;
    public status:string;
    public token:any;
    public requi:Requisicion;
    public displayedColumns: string[] = ['codigo', 'nombre','cantidad','iva','total'];
    public articulos: MatTableDataSource<Articulo>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router
    ){
        let date:Date = new Date();
        this.requi = new Requisicion(0,0,0,0,0,'COMPRA','NUEVO',0,date,null,null,null)
    }

    ngOnInit(){

    }

}//End Class