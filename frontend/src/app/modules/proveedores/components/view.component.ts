import { Component, OnInit, ViewChild } from '@angular/core';
import { Proveedor } from './../../../models/proveedores';
import { Contacto } from './../../../models/contacto';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
    selector: 'proveedor-view',
    templateUrl: './view.component.html',
    providers:[
        UserService,
        GeneralCallService
    ]
})

export class ProveedorViewComponent implements OnInit{
    public title: string;
    public status: string;
    public token: any;
    public displayedColumns: string[] = ['nombre', 'razon_social','id','eliminar'];
    public proveedores: MatTableDataSource<Proveedor>;
    public contactos: Array<Contacto>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService:GeneralCallService
    ){
        this.title='Proveedores';
        this.token = this._UserService.getToken();
    }

    ngOnInit(){
        this.getProveedores();
    }

    getProveedores(){
        this._GeneralCallService.getRecords(this.token,'proveedores').subscribe(
            response=>{
                this.proveedores = new MatTableDataSource(response.proveedores);
                this.proveedores.paginator = this.paginator;
                this.proveedores.sort = this.sort;
            },error=>{
            console.log(<any>error);
            });
    }

    //Funcion que aplica el filtro en la tabla de proveedores
    applyFilter(filterValue: string) {
        this.proveedores.filter = filterValue.trim().toLowerCase();
    
        if (this.proveedores.paginator) {
          this.proveedores.paginator.firstPage();
        }
    }

    deleteRecord(id){
        if(confirm('Eliminar Registro')){
            this._GeneralCallService.delteRcord(this.token,'proveedores',id).subscribe(
                response=>{
                    this.getProveedores();
                }
            );
        }
    }


}//End Class