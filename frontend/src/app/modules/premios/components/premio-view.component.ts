import { Component, OnInit} from '@angular/core';
import { Premio} from './../../../models/premio';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import { Busqueda } from 'src/app/models/busqueda';
@Component({

    selector: 'premio-view',
    templateUrl: './premio-view.component.html',
    styleUrls: ['./estilo.component.css'],
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
    public busqueda: Busqueda;
    constructor(
         private _UserService: UserService,
         private _GeneralCallService:GeneralCallService
          ){
            this.title = "Premios";
            this.token = this._UserService.getToken();
            this.busqueda = new Busqueda(null, null, null);
          }

          ngOnInit(){
            this.getPremios();
            }
            getPremios(){

                this._GeneralCallService.getRecords(this.token,'premios').subscribe(
                    response=>{
                        this.premios = response.premio;
                    },error=>{
                        console.log(<any>error);
                    }
                );
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