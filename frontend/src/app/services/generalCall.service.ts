import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';

@Injectable()
export class GeneralCallService{
    public url: string;
    public token: any;
    public idnetity: any;
    
    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    /**Funcon para traer los articulos */
    getRecords(token,page:string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token);
        return this._http.get(this.url+page,{headers:headers});
    }

      /**Funcion para crear un nuevo puesto */
    storeRecord(token, page:string, elemento:any):Observable<any>{
        let json = JSON.stringify(elemento);
        let params = "json="+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                     .set('Authorization', token);

        return this._http.post(this.url+page,params,{headers:headers});
    }

    /**Funcion para encontrar un registro */
    getRecrod(token, page:string, id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Authorization', token);
        return this._http.get(this.url+page+'/'+id ,{headers:headers});
    }

    /**Funcion para editar un registro */
    updateRecord(token,page:string, elemento:any, id): Observable<any>{
        let json = JSON.stringify(elemento);
        let params = "json=" + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Authorization', token);
        return this._http.put(this.url+page+'/'+id ,params ,{headers:headers});
    }
     
    /**Funcion para editar Barios Registros*/
    updateArrayRecord(token,page:string, elemento:Array<any>, id): Observable<any>{
        let json = JSON.stringify(elemento);
        let params = "json=" + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Authorization', token);
        return this._http.put(this.url+page+'/'+id ,params ,{headers:headers});
    }
    
    //funcion para eliminar un registro
    delteRcord(token,page:string,id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Authorization', token);
        return this._http.delete(this.url+page+'/'+id,{headers:headers});
    }
}