import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Almacen } from './../../../../models/almacen'
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
    public displayedColumns: string[]=[];
    public almacen: MatTableDataSource<Almacen>;
    // interfaces para la paginacion de la tabla
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _UserService:UserService,
        private GeneralCallService:GeneralCallService
    ){
        this.title = "Existencia";
        this.token = this._UserService.getToken();
    }

    ngOnInit(){
        
    }

    applyFilter(filterValue: string) {
        this.almacen.filter = filterValue.trim().toLowerCase();
    
        if (this.almacen.paginator) {
          this.almacen.paginator.firstPage();
        }
    }
}//End Class