import { Component, OnInit, ViewChild } from '@angular/core';
import { Articulo } from './../../../models/articulo'
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
    selector: 'articulo-view',
    templateUrl: './view.component.html',
    providers:[
        UserService,
        GeneralCallService
    ]
})

export class ArticuloViewComponent implements OnInit{
    public title: string;
    public status: string;
    public token: any;
    public articulos: Array<Articulo>;
    public displayedColumns: string[] = ['codigo', 'nombre', 'marca', 'modelo','id','eliminar'];
    public dataSource: MatTableDataSource<Articulo>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService:GeneralCallService
    ){
        this.title = "Articulos";
        this.token = this._UserService.getToken();
    }

    ngOnInit(){
        this.getArticulos();
    }

    getArticulos(){

        this._GeneralCallService.getRecords(this.token,'articulos').subscribe(
            response=>{
                this.articulos = response.articulo;
                this.dataSource = new MatTableDataSource(response.articulo);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },error=>{
                console.log(<any>error);
            }
        );
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
    }
    
    deleteRecord(id){
        if(confirm('Eliminar Registro')){
            this._GeneralCallService.delteRcord(this.token,'articulos',id).subscribe(
                response=>{
                    this.getArticulos();
                }
            );
        }
    }

}//EndClass