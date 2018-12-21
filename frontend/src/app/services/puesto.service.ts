import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
import {Puesto} from '../models/puesto';

@Injectable()
export class PuestoService{
public url: string;
public token: any;
public idnetity: any;

constructor(
    public _http: HttpClient
){
    this.url = GLOBAL.url;
}
/**Funcion para invocar una lista de permisos */
getPuestos(token): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);
    return this._http.get(this.url+'puestos',{headers:headers});
}

}