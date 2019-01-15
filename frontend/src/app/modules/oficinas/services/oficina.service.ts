import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {GLOBAL} from '../../../services/global';
import {Oficina} from '../../../models/oficina';

@Injectable()
export class OficinaService{
  public url: string;
  public token: any;
  public idnetity: any;

    constructor (
      public _http: HttpClient
    ){
        this.url = GLOBAL.url;
    }
    //lista de permisos
  getOficinas(token):Observable<any>{
     let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
     .set('Authorization', token);
     return this._http.get(this.url+'oficinas',{headers:headers});
   }
//crear nueva Oficina
   storeOficina(token, oficina:Oficina):Observable<any>{
       let json = JSON.stringify(oficina);
       let params = "json="+json;
       let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                       .set('Authorization', token);

       return this._http.post(this.url+'oficinas',params,{headers:headers});
   }
         //encontar una Oficina
   getOficina(token, id): Observable<any>{
       let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
       .set('Authorization', token);
       return this._http.get(this.url+'oficinas/'+id ,{headers:headers});
   }
       //actualizar o editar una Oficina
   updateOficina(token,oficina:Oficina,id){
       let json = JSON.stringify(oficina);
       let params = "json=" + json;
       let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
                                   .set('Authorization', token);
       return this._http.put(this.url+'oficinas/'+id ,params ,{headers:headers});
   }

   delteOficina(token,id): Observable<any>{
      let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
             .set('Authorization', token);
     return this._http.delete(this.url+'oficinas/'+id,{headers:headers});
   }
}//end class
