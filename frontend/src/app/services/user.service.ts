import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {User} from '../models/user';

@Injectable()
export class UserService{
    public url: string;
    public token;
    public idnetity;
    
    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    /** Función para registrar usuarios en la base de datos  */
    register(user): Observable<any>{
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'register',params,{headers:headers});
    }

    /** Función para lograr al usuario */
    signup(user, gettoken = null): Observable<any>{
        if(gettoken != null){
            user.gettoken = "true";
        }
        let json = JSON.stringify(user);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.post(this.url+'login',params,{headers:headers});
    }

    getIdentity(){
        let idnetity = JSON.parse(localStorage.getItem('identity'));
        if (idnetity != "undefined") {
            this.idnetity = idnetity;
        }else{
            this.idnetity = null;
        }
        return this.idnetity;
    }

    getToken(){
        let token = localStorage.getItem('token');
        if (token != "undefined") {
            this.token = token;
        }else{
            this.token = null;
        }
        return this.token;
    }
    /**Funcion para Encontrar Usuario Registrado*/
    getUser(token,$mail): Observable<any>{
        let json = JSON.stringify($mail);
        let params = 'json='+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);
        return this._http.post(this.url+'show',params,{headers:headers});
    }

}