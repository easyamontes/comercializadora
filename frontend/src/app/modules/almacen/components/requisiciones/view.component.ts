import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
//Servicios
import { UserService } from './../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';
//Modelos
import { Requisicion } from './../../../../models/requisicion';

@Component({
    selector: 'requi-view',
    templateUrl: './view.component.html',
    providers: [
        UserService,
        GeneralCallService
    ]
})

export class RequisicionViewComponent implements OnInit {
    //Propiedades de la clasee
    public title: string;
    public status: string;
    public token: any;
    public requisicion: MatTableDataSource<Requisicion>;
    public displayedColumns: string[] = ['codigo', 'articulo', 'proveedor', 'cnt', 'tipo', 'accion'];
    //Vistas heredadas
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
    ) {
        this.token = this._UserService.getToken();
        this.title = "Recepcion De Articulos";
    }


    ngOnInit() {
        this.getRequi();
    }

    /** Funcion para traer las requisiciones pendientes por recibir */
    getRequi() {
        this._GeneralCallService.getRecords(this.token, 'requisicion').subscribe(
            response => {
                if (response.code == 200) {
                    this.requisicion = new MatTableDataSource(response.requisicion);
                } else {
                    let emitem: Array<Requisicion>
                    emitem = [];
                    this.requisicion = new MatTableDataSource(emitem);
                }
            }, error => {
                console.log(<any>error);
            });
    }


    applyFilter(filterValue: string) {
        this.requisicion.filter = filterValue.trim().toLowerCase();
        if (this.requisicion.paginator) {
            this.requisicion.paginator.firstPage();
        }
    }

}//end class