import { Component, OnInit, ViewChild } from '@angular/core';
import { Personal } from './../../../models/personal'
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import {GeneralListService} from '../../../services/generalList.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
    selector: 'personal-view',
    templateUrl: './view.component.html',
    providers:[
        UserService,
        GeneralCallService,
        GeneralListService
    ]
})

export class PersonalViewComponent implements OnInit{
    public title:string;
    public status: string;
    public token: any;
    public personal: Array<Personal>;
    public selectList: Array<any>;
    public displayedColumns: string[] = ['nombre','direccion','editar','eliminar'];
    public dataSource: MatTableDataSource<Personal>;

   
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService : GeneralCallService
    ){
        this.title = 'Personal';
        this.token = this._UserService.getToken();
    }

    ngOnInit(){
        this.getPersonal();
    }

    getPersonal(){
        this._GeneralCallService.getRecords(this.token,'personal').subscribe(
            response=>{
                this.personal = response.personal;
                this.dataSource = new MatTableDataSource(response.personal);
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

}//End Class