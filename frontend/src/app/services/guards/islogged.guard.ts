import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { UserService } from '../user.service';

@Injectable()
export class IsLoggedGuard implements CanActivate{
    public identity:any;
    public status:any;

    constructor(
        private _UserService: UserService,
        private _router: Router
    ){}
    
    canActivate(){
  
        // comprobando la valides del token en el servicio
        this.identity = this._UserService.getIdentity();
        let currentime = new Date().getTime()/1000;
        if(this.identity != null){
            if(+currentime > +this.identity.exp){
                this._router.navigate(['logout/1']);
                return false;
            }else{
                return true;
            }
        }else{
            this._router.navigate(['logout/1']);
            return false;
        }
    }

    canActivateChild(){
        return this.canActivate();
    }

}//End Calss 