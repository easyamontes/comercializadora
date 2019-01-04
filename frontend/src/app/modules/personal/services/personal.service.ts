import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from '../../../services/global';
import {Personal} from '../../../models/personal';

@Injectable()
export class PersonalService{
    public url: string;
    public token: any;
    public idnetity: any;

    constructor(
        public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }

    getPersonal(token): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Authorization', token);
        return this._http.get(this.url+'personal',{headers:headers});  
    }

    storePersonal(token, personal:Personal):Observable<any>{
        let json = JSON.stringify(personal);
        let params = "json="+json;
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                        .set('Authorization', token);
        
        return this._http.post(this.url+'personal',params,{headers:headers});
    }

}//end class