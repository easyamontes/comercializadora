import {Component, OnInit} from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import {Banco} from './../../../models/banco';

@Component({
       selector: 'banco-edit',
       templateUrl: './banco-edit.component.html',

       providers:[
        UserService,
        GeneralCallService
        ]})

    export class BancoEditComponent implements OnInit {
         public title:string;
         public status:string;
         public token:any;
         public bancovar: Banco;

         constructor(
            private _UserService: UserService,
            private _GeneralCallService :GeneralCallService,
            private _route: ActivatedRoute,
            private _router: Router

         ){
            this.title="Editando";
            this.token=this._UserService.getToken();
         }

        ngOnInit(){
            this._route.params.subscribe(
                   params=>{
                       let id = +params['id'];
                       this.getBanco(id);
                   }
            );
         }//end ngonit

         getBanco(id){
            this._GeneralCallService.getRecrod(this.token,'bancos',id).subscribe(
                response=>{
                    if(response.status == 'success'){
                        this.bancovar = response.banco;
                    }else{
                        this._router.navigate(['bancos']);
                    }
                },error=>{
                    console.log(<any>error);
                }
            );

         }
         
         onSubmit(form){
            this._GeneralCallService.updateRecord(this.token,'bancos',this.bancovar,this.bancovar.id).subscribe(
                response=>{
                    this._router.navigate(['bancos']);
                },error=>{
                    console.log(<any>error);
                }
            );
        }

        CancelEdit(){
            this.bancovar = null;
            this._router.navigate(['bancos']);
        }
    

    }//end class