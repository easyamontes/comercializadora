import { Component, OnInit } from '@angular/core';
//Utils
import { PersonalUtil } from '../../../../services/util/personal.util';
//Servicios
import { UserService } from '../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';


@Component({
    selector: 'diario-view',
    templateUrl: './view.component.html',
    providers:[
        UserService,
        GeneralCallService
    ]
})

export class DiarioViewComponent implements OnInit{
    public title: string;
    public token: any;
    public identity: any;
    public personaid;
    public existenciaRepo: Array<any>;
    public compraRepo: Array<any>;
    public ventaRepo: Array<any>;
    public personaList: Array<any>;

    constructor(
        private _UserService:UserService,
        private _GeneralCallService:GeneralCallService,
        private _PersonalUtil: PersonalUtil,
    ){
        this.token = this._UserService.getToken();
        this.identity = this._UserService.getIdentity();
    }

    ngOnInit(){
        this.getEquipo();
        this.getDataRepo();
    }



    /*==============================================================
        FUNCION PARA EL CUADRO DE DIALOGO DE REGISTRO DE USUARIO
    ================================================================ */
    getDataRepo(id = this.identity.per) {
        this._GeneralCallService.getRecrod(this.token,'repo',id).subscribe(
            response=>{
                this.existenciaRepo = response.existencia;
                this.compraRepo = response.compra;
                this.ventaRepo = response.venta;
            },error=>{
                console.log(<any>error);
            });
    }

    /*==============================================================
        FUNCION PARA EL CUADRO DE DIALOGO DE REGISTRO DE USUARIO
    ================================================================ */
    getEquipo() {
        this._GeneralCallService.getRecords(this.token,'here').subscribe(
            response=>{
                this.personaList = this._PersonalUtil.getFamilia(response);
            }
        )
    }

    onChangeSelector(){
        this.getDataRepo(this.personaid);
    }

}//End Class