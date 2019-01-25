import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import { Banco} from './../../../models/banco';

@Component({
    selector:'banco-store',
    templateUrl: 'banco-edit.component.html',
    providers: [
        UserService,
        GeneralCallService
     ]

})
export class BancoStoreComponent implements OnInit
   { 
       public title: string;
       public status_banco: any;
       public token: any;
       public bancovar: Banco;
       public selectlist: Array<Banco>;

       constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router
       ){
        this.title ='Nuevo Banco';
        this.token = this._UserService.getToken();
       }
  
    ngOnInit(){
        this.bancovar = new Banco ( 0,'','','','','','','','','','','');
        this.title = 'Nuevo Banco';
    }//end ngininit
        onSubmit(form) {
            this._GeneralCallService.storeRecord(this.token,'bancos',this.bancovar).subscribe //this.toker, "bancos = como se declaro en wep.php"
            (
                response=>{
                    this.bancovar = response.banco;
                    this.status_banco = response.status;
                    if(this.status_banco == 'success'){
                        this._router.navigate(['bancos'])
                    }

                },error =>{
                    console.log(<any>error);
                }
            );
        }

        CancelEdit(){
           this.bancovar = null;
           this._router.navigate(['bancos']);
       }

   }//end class