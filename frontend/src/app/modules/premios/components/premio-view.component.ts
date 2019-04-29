import { Component, OnInit, ViewChild } from '@angular/core';
import { Premio} from './../../../models/premio';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({

    selector: 'premio-view',
    templateUrl: './premio-view.component.html',
    providers:[
        UserService,
        GeneralCallService
    ]
})

export class PremiosViewComponent implements OnInit {
    public title: string;
    public status: string;
    public token: any;
    public premios:Array<Premio>;
    public displayedColumns: string[] = ['nombre','finicio','ffinal','editar','eliminar'];
    public dataSource:MatTableDataSource<Premio>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
         private _UserService: UserService,
         private _GeneralCallService:GeneralCallService
          ){
            this.title = "Premios";
            this.token = this._UserService.getToken();
          }

          ngOnInit(){
            this.getPremios();
            }
            getPremios(){

                this._GeneralCallService.getRecords(this.token,'premios').subscribe(
                    response=>{
                        this.premios = response.premio;
                        this.dataSource = new MatTableDataSource(response.premio);
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
                
    deletePremio(id){
        if(confirm('Eliminar Registro')){
            this._GeneralCallService.delteRcord(this.token,'premios',id).subscribe(
                response=>{
                    this.getPremios();
                }
            );
        }
    }
        


}//end class PremioViewComponent