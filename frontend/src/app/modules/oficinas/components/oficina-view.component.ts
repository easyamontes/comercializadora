import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import {GeneralListService} from '../../../services/generalList.service';
import { Oficina} from 'src/app/models/oficina';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
      selector: 'oficinas',
      templateUrl: './oficina-view.component.html',
      providers:[
        UserService,
        GeneralCallService,
        GeneralListService
      ]
})

   export class OficinaViewComponent implements OnInit{
      public title: string;
      public status: string;
      public token;
      public oficinas: Array <Oficina>;
      public selectList: Array<any>;
      public displayedColumns: string[] = ['nombre','encargado','descripcion','editar','eliminar'];
      public dataSource: MatTableDataSource<Oficina>;
      
      @ViewChild(MatPaginator) paginator: MatPaginator;
      @ViewChild(MatSort) sort: MatSort;

      constructor (
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _GeneralListService: GeneralListService,
        private _router: Router
      ){
        this.title = 'Oficinas';
        this.token = this._UserService.getToken();
      }

     ngOnInit(){
         this.getOficinas();
         this.gerOptions();
        }


      gerOptions(){
        this._GeneralListService.getListEmpleado(this.token,'lpersonal').subscribe(
            response=>{
                this.selectList = response.personall;
            }
        );
        }
    
      getOficinas(){
       this._GeneralCallService.getRecords(this.token,'oficinas').subscribe(
            response =>{
               this.oficinas = response.oficinas;
               this.dataSource = new MatTableDataSource(response.oficinas);
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

     delteteOficina(id){
          if (confirm('seguro que desea eliminar esta oficina')){
            this._GeneralCallService.delteRcord(this.token,'oficinas',id).subscribe(
              response=>{
                this.getOficinas();
              },error=>{
                console.log(<any>error);
              }
            )
          }

      }

   }//end class export
