import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import {GeneralListService} from '../../../services/generalList.service';
import { Premio} from 'src/app/models/premio';
import { Response } from 'selenium-webdriver/http';

@Component ({
   selector: 'premio',
   templateUrl: './premio-edit.component.html',
   providers: [
    UserService,
    GeneralCallService,
    GeneralListService
   ]
})

export class PremioEditComponent implements OnInit 
     {
        public title:string;
        public user: User;
        public status: string;
        public token;
        public premi: Premio;
        public selectList: Array<any>;
     
        constructor (
            private _UserService: UserService,
            private _GeneralCallService: GeneralCallService,
            private _GeneralListService: GeneralListService,
            private _route: ActivatedRoute,
            private _router: Router
       ){
         this.token = this._UserService.getToken();
       }

       ngOnInit(){
            this._route.params.subscribe(
            params =>{
                let id = +params['id'];
                this.getPermiso(id);
                   }
            );
       }//end ngOnInit
    //buscar permiso
    getPermiso (id){
               this._GeneralCallService.getRecrod(this.token,'permisos',id).subscribe(
                        response =>{
                            if (response.status== 'success'){
                                this.premi = response.permiso;
                                this.title = 'Editar Premio:';
                            }else {
                                this._router.navigate(['premios']);
                            }
                        },error=>{
                            console.log(<any>error);
                        }
                   );
             }//end getpermiso
    
             onSubmit(form){
                this._GeneralCallService.updateRecord(this.token,'premios',this.premi,this.premi.id).subscribe(
                    response=>{
                        this._router.navigate(['premios']);
                    },error=>{
                        console.log(<any>error);
                    }
                );
            }
        
            cancelEdit(){
                this.premi = null;
                this._router.navigate(['premios']);
            }
        
          
     }//end class