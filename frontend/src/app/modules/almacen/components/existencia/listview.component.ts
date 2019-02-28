import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Almacen } from './../../../../models/almacen';
import { Requisicion } from './../../../../models/requisicion';
import { UserService } from '../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';

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
    public displayedColumns: string[]=['codigo','articulo','proveedor','existencia'];
    public articulos: MatTableDataSource<Almacen>;
    // interfaces para la paginacion de la tabla
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _UserService:UserService,
        private _GeneralCallService:GeneralCallService
    ){
        this.title = "Existencia";
        this.token = this._UserService.getToken();
    }

    ngOnInit(){
        this.getExistencias();
    }


    getExistencias(){
        this._GeneralCallService.getRecords(this.token,'requisicion').subscribe(
            response=>{
                this.articulos = response.requisicion
                this.articulos.paginator = this.paginator;
                this.articulos.sort = this.sort;
            },error=>{
                console.log(<any>error);
            }
        )
    }


    applyFilter(filterValue: string) {
        this.articulos.filter = filterValue.trim().toLowerCase();
    
        if (this.articulos.paginator) {
          this.articulos.paginator.firstPage();
        }
    }
}//End Class