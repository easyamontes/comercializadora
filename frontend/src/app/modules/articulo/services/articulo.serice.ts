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
}