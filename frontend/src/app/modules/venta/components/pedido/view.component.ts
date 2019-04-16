import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
//Servicios
import { UserService } from './../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';
import { Pedido } from'src/app/models/pedido';


@Component({
     selector: 'dev-view',
    templateUrl: './view.component.html',
    providers: [
        UserService,
        GeneralCallService,
    ]    
})

export class PedidoViewComponent implements OnInit {

      public token: any;
      public pedidos :Array<Pedido>;
      public displayedColumns: string[] = ['id','nombre','fechapedido','importe','editar'];
      public dataSource: MatTableDataSource<Pedido>;
      
      @ViewChild(MatPaginator) paginator: MatPaginator;
      @ViewChild(MatSort) sort: MatSort;
  

      constructor (
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
      ){
        this.token = this._UserService.getToken();
      }

    ngOnInit() {
      this.getPedidos();  
    }

    getPedidos(){
        this._GeneralCallService.getRecords(this.token,'ventas').subscribe(
            response =>{
                this.pedidos = response.pedidos;
                this.dataSource = new MatTableDataSource(response.pedidos);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;    
                console.log ('pedidos');
            },error =>{
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
}