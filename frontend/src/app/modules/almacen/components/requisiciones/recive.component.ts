import { Component,OnInit } from '@angular/core';
import {  MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
//Utils
import { PersonalUtil } from '../../../../services/util/personal.util';
//servicios
import { UserService } from './../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';
//Modelos
import { Requisicion } from '../../../../models/requisicion';
import { Almacen } from './../../../../models/almacen';
import { Busqueda } from 'src/app/models/busqueda';

@Component({
    selector: 'recive-store',
    templateUrl: './recive.component.html',
    providers: [
        UserService,
        GeneralCallService,
        PersonalUtil
    ]
})

export class RequisicionReciveComponent implements OnInit{
    public title: string;
    public params: number;
    public status: string;
    public token: any;
    public identity: any;
    public requi: Requisicion;
    public item: Array<Almacen>;
    public articulos: Array<Almacen>;
    public proveedor: string = "";
    public persona: string = "";
    public busqueda: Busqueda;


    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _MatSnackBar: MatSnackBar,
        private _router: Router,
        private _route: ActivatedRoute,
    ){
        this.identity = this._UserService.getIdentity();
        this.token = this._UserService.getToken();
        this.busqueda = new Busqueda(null, null, null);
    }

    ngOnInit(){
        this._route.params.subscribe(
            params => {
                let id = +params['sure'];
                this.getrequisicion(id);
            }
        );
    }
    
    /*==============================================================================
       Funcion para invocar la lista de requisiciones
    ==============================================================================*/
    getrequisicion(id) {
        this._GeneralCallService.getRecrod(this.token,'requisicion',id).subscribe(
            response=>{
                this.requi = response.requisicion;
                this.articulos = response.requisicion.articulos;
                this.proveedor = response.requisicion.proveedor.nombre;
                this.persona = response.requisicion.porigen.nombre;
            },error=>{
                console.log(<any>error);
            });
    }

    
    /*==============================================================================
       Funcion para guardar
    ==============================================================================*/
    onSubmit(){
        if(confirm('Terminar Recepcion Articulos')){
            if(this.validaExistncia(this.articulos)){
                this.requi.status="RECIBIDO"
            }
            this._GeneralCallService.updateRecord(this.token,'requisicion',this.requi,this.requi.id).subscribe(
                response=>{
                    if(response.code == 200){
                        this.SetExistencia();
                        this._GeneralCallService.updateRecord(this.token,'almaitem',this.articulos,1).subscribe(
                            response=>{
                                this._router.navigate(['almacen/requisicions']);
                        },error=>{
                            console.log("Error en almacen" + <any>error);
                            this._MatSnackBar.open('Error en almacen','ok',{
                                duration: 2000
                            });
                        });
                    }
            },error=>{
                console.log("Error en la requisicion" + <any>error);
                this._MatSnackBar.open('Error en la requisicion','ok',{
                    duration: 2000
                });
            });
        }
    }

    SetExistencia() {
        for (var c = 0; c < this.articulos.length; c++){
            this.articulos[c].existencia = this.articulos[c].existencia + this.articulos[c].recepcion;
            this.articulos[c].pendiente = this.articulos[c].pendiente - this.articulos[c].recepcion;
            this.articulos[c].recepcion = 0;
        }
    }
    
    /*==============================================================================
       Confirma si se surtio por completo la requisicion
    ==============================================================================*/
    validaExistncia(data: Almacen[]): boolean  {
        for (var c = 0; c < data.length; c++){
            let exi = data[c].recepcion + data[c].existencia;
            if(exi < data[c].cantidad){
                return false;
            }
        }
        return true;
        
    }
    onCancel(){
        this._router.navigate(['almacen/requisicions']);
    }

    /*==============================================================================
       Verifica que se ingrese un numero valido para la recepcion de articulos
    ==============================================================================*/
    checkMinMax(index){
        let cantidad = +this.articulos[index].pendiente;
        let recepcion = +this.articulos[index].recepcion;
        if(cantidad < recepcion || recepcion < 0 || !recepcion){
            this.articulos[index].recepcion = 0;
        } else {
            this.articulos[index].recepcion = 500;
        }
    }
}