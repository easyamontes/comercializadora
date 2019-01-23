import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from './global';
@Injectable()
export class GeneralListService{
    public url: string;
    public token: any;
    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    /**lista para alimentar las opcciones del empleado */
    getListEmpleado(token,page:string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token);
        return this._http.get(this.url+page,{headers:headers});
    }

}

