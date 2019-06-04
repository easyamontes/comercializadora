import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
//Servicios
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
//Utils
import { PersonalUtil } from '../../../services/util/personal.util'
//Modelos
import { Personal } from './../../../models/personal'
//Componentes
import { PersonalRegisterComponent } from './register.component';


@Component({
    selector: 'personal-view',
    templateUrl: './view.component.html',
    providers:[
        UserService,
        GeneralCallService,
        PersonalUtil
    ]
})

export class PersonalViewComponent implements OnInit{
    public title:string;
    public status: string;
    public token: any;
    public personal: Array<Personal>;
    public selectList: Array<any>;
    public displayedColumns: string[] = ['nombre','oficina','Visualizar','editar','eliminar','usuario'];
    public dataSource: MatTableDataSource<Personal>;

   
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _UserService: UserService,
        private _PersonalUtil:PersonalUtil,
        private _GeneralCallService : GeneralCallService,
        private _MatDialog: MatDialog
    ){
        this.title = 'Colaborador';
        this.token = this._UserService.getToken();
    }

    ngOnInit(){
        this.getPersonal();
    }


    /** Funcion para abrir cuadro de dialogo para el registro */
    openDialog(data:Personal): void{
        const dialogRef =this._MatDialog.open(PersonalRegisterComponent,{
            data: {persona:data}
        });
        dialogRef.disableClose=true;
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    getPersonal(){
        this._GeneralCallService.getRecords(this.token,'here').subscribe(
            response=>{
                this.personal = this._PersonalUtil.getFamilia(response);
                this.personal.splice(0,1);
                console.log(this.personal);
                this.dataSource = new MatTableDataSource(this.personal);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            },error=>{
                console.log(<any>error);
            });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
    }

    deletePersona(id){
        if(confirm('Eliminar este registro?')){
            this._GeneralCallService.delteRcord(this.token,'personal',id).subscribe(
                response=>{
                    this.getPersonal();
                },error=>{
                    console.log(<any>error);
                }
            );
        }
    }

    getEquipo(lider=null,puesto=null){
        let filters = {padre:[lider],puesto:[puesto]}
        return this.personal.filter(o =>
            Object.keys(filters).every(k =>
                [].concat(filters[k]).some(v => o[k].includes(v))));
    }

}//End Class