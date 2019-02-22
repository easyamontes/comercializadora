import { Component, OnInit, ViewChild } from '@angular/core';
import { Banco} from './../../../models/banco';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Router } from '@angular/router';

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
       private _GeneralCallService:GeneralCallService,
       private _router: Router
   ){
    this.title = "Lista de Bancos";
    this.token = this._UserService.getToken();
    }

    ngOnInit(){
        this.getBancos();
    }
        //lamado del listado de bancos despues del token va como se declaro en wep.php
        getBancos(){
        this._GeneralCallService.getRecords(this.token,'bancos').subscribe(
            response =>{
                this.bancos = response.bancos;
                this.dataSource = new MatTableDataSource(response.bancos);
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
    delBanco(id){
        if(confirm('Seguro que desea eliminar este banco?')){
            this._GeneralCallService.delteRcord(this.token,'bancos',id).subscribe(
                response=>{
                    this.getBancos();
                },error=>{
                    console.log(<any>error);
                }
            )
        }
    }


}// end class