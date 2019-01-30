import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { UserService } from '../../../services/user.service';
import {GeneralCallService} from '../../../services/generalCall.service';
import {GeneralListService} from '../../../services/generalList.service';
import { Premio} from './../../../models/premio';

@Component ({
              selector: 'premio-store',
              templateUrl: './premio-edit.component.html',
              
              providers:[
                UserService,
                GeneralCallService,
                GeneralListService
              ]
})

export class PremioStoreComponent implements OnInit {
    public title: string;
    public status_premio: any;
    public token: any;
    public prem: Premio;
    public selectList: Array<any>;


    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _GeneralListService: GeneralListService,
        private _router: Router
    )
    {
        this.title ='Premio';
        this.token = this._UserService.getToken();
    }

  ngOnInit(){
      this.prem = new Premio( 0,'','','','','');

    }

    onSubmit(from)
    {
        console.log(this.token);
        this._GeneralCallService.storeRecord(this.token,'premios',this.prem).subscribe(
            response =>{
                this.prem = response.premio;
                this.status_premio = response.status;
                if(this.status_premio == 'success'){
                    this._router.navigate(['premios']);
                }else{
                    this.status_premio = 'Response Error'
                }

            },error =>{
                console.log(<any>error);
                this.status_premio = <any>error;
            });
    }//end onSubmit

    cancelar(){
        this.prem = null;
        this._router.navigate (['premios']);
    }

}//end class