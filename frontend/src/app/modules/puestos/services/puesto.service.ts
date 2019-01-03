import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from '../../../services/global';
import {Puesto} from '../../../models/puesto';

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

    /**Funcion para crear un nuevo puesto */
    storePuesto(token, puesto:Puesto):Observable<any>{
        let json = JSON.stringify(puesto);
        let params = "json="+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Authorization', token);

        return this._http.post(this.url+'puestos',params,{headers:headers});
    }

    /**Funcion para encontrar un puesto */
    getPuesto(token, id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Authorization', token);
        return this._http.get(this.url+'puestos/'+id ,{headers:headers});
    }

    /**Funcion para editar un puesto */
    updatePuesto(token, puesto:Puesto, id): Observable<any>{
        let json = JSON.stringify(puesto);
        let params = "json=" + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Authorization', token);
        return this._http.put(this.url+'puestos/'+id ,params ,{headers:headers});
    }

    deltePuesto(token,id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Authorization', token);
        return this._http.delete(this.url+'puestos/'+id,{headers:headers});
    }

}//End class