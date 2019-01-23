import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import { Puesto } from 'src/app/models/puesto';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
    selector: 'puestos',
    templateUrl: './puesto-view.component.html',
    providers: [
        UserService,
        GeneralCallService
    ]
})

export class PuestoViewComponent implements OnInit{
    public title: string;
    public user: User;
    public status: string;
    public token;
    public puestos: Array<Puesto>;
    public displayedColumns: string[] = ['puesto','descripcion','editar','eliminar'];
    public dataSource: MatTableDataSource<Puesto>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService
    ){
        this.title = 'Organizacion';
        this.token = this._UserService.getToken();
    }

    ngOnInit(){
        this.getPuestos();
    }

    //llamado el lisrado de los puertos
    getPuestos(){
        this._GeneralCallService.getRecords(this.token,'puestos').subscribe(
            response =>{
                this.puestos = response.puestos;
                this.dataSource = new MatTableDataSource(response.puestos);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },error =>{
                console.log(<any>error);
            });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
    }

    deltetePuesto(id){
        if(confirm('Seguro que desea eliminar este registro?')){
            this._GeneralCallService.delteRcord(this.token,'puestos',id).subscribe(
                response=>{
                    this.getPuestos();
                },error=>{
                    console.log(<any>error);
                }
            )
        }
    }




}//END Class