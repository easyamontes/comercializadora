import { Component, OnInit, ViewChild } from '@angular/core';
import { MatListItem, MatListModule } from '@angular/material';
import { Router } from '@angular/router';
//Servicios
import { UserService } from './../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';
import { Almacen } from './../../../../models/almacen';


@Component({
    selector: 'ven-view',
    templateUrl: './socio.component.html',
    styleUrls:['./estilo.component.css'],
    providers: [
        UserService,
        GeneralCallService
    ]
})

export class SocioComponent implements OnInit {

    public token: any;
    public title: any;
    public vent: Array<Almacen>;
    public status:string;
    
    constructor(
        private _UserService: UserService,
        private _router: Router,
        private _GeneralCallService: GeneralCallService,
    ) {
        this.token = this._UserService.getToken();
        this.title = "Socio Comercial";
    }

    ngOnInit() {

        this.lisventa();

    }

    lisventa() {
        this._GeneralCallService.getRecords(this.token, 'liscambaceo').subscribe(
            response => {
                this.vent = response.almacen[0].articulos;
                console.log('liscambaceo');
            }
        )
    }

    aumentar(index, tipo) {
        if (tipo == 'suma') {
            if (this.vent[index].existencia > this.vent[index].venta) {
                this.vent[index].venta = +this.vent[index].venta + 1;
            } else {
                (confirm('su existencia se ha terminado'))
            }
        } else {
            if (this.vent[index].venta > 0) {
                this.vent[index].venta = +this.vent[index].venta - 1;
            } else {
                (confirm('no pueden vender menos de 0'))
            }
        }
    }

         /*=============================================================================
           UPDATE DE lista de productos
         =============================================================================== */   
         Guardar(){
             this._GeneralCallService.updateRecord(this.token,'almaitem',this.vent,this.vent[0].id).subscribe(
                response=>{
                    this._router.navigate(['./ventas/welcome']);
               },error=>{
                    console.log(<any>error);       
           });
      }

    CancelEdit() {
        this._router.navigate(['./ventas/welcome']);
    }
}