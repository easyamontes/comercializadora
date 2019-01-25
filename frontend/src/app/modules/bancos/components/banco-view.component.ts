import { Component, OnInit, ViewChild } from '@angular/core';
import { Banco} from './../../../models/banco';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
    selector: 'banco-view',
    templateUrl:'./banco-view.component.html',
    providers:[
        UserService,
        GeneralCallService
    ]
})

export class BancosViewComponent implements OnInit{
         public title: string;
         public status: string;
         public token: any;
         public bancos: Array<Banco>;
         public displayedColumns: string[] = ['nombre','alias','cuenbanca','editar','eliminar'];
         public dataSource: MatTableDataSource<Banco>;

         @ViewChild(MatPaginator) paginator: MatPaginator;
         @ViewChild(MatSort) sort: MatSort;

   constructor(
       private _UserService: UserService,
       private _GeneralCallService:GeneralCallService
   ){
    this.title = "Bancos";
    this.token = this._UserService.getToken();
    }

    ngOnInit(){
        this.getBancos();
    }

    getBancos(){
        this._GeneralCallService.getRecords(this.token,'bancos').subscribe(
            response=>{
                this.bancos = response.banco;
                this.dataSource = new MatTableDataSource(response.banco);
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


}// end class