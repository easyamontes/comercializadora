import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from '../../../services/global';
import {Articulo} from '../../../models/articulo';

@Injectable()
export class ArticuloService{
    public url: string;
    public token: any;
    public idnetity: any;
    
    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    /**Funcon para traer los articulos */
    getArticulos(token):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token);
        return this._http.get(this.url+'articulos',{headers:headers});
    }
      /**Funcion para crear un nuevo puesto */
    storeArticulo(token, articulo:Articulo):Observable<any>{
        let json = JSON.stringify(articulo);
        let params = "json="+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Authorization', token);

        return this._http.post(this.url+'articulos',params,{headers:headers});
    }

    /**Funcion para encontrar un puesto */
    getArticulo(token, id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Authorization', token);
        return this._http.get(this.url+'articulos/'+id ,{headers:headers});
    }

    /**Funcion para editar un puesto */
    updateArticulo(token, articulo:Articulo, id): Observable<any>{
        let json = JSON.stringify(articulo);
        let params = "json=" + json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Authorization', token);
        return this._http.put(this.url+'articulos/'+id ,params ,{headers:headers});
    }

    delteArticulo(token,id): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                    .set('Authorization', token);
        return this._http.delete(this.url+'articulos/'+id,{headers:headers});
    }
}