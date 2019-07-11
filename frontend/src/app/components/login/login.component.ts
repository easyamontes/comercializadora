import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { SidenavService } from '../../services/sidenavService';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [UserService]
})

export class LoginComponent implements OnInit{
    public title: string;
    public user: User;
    public token;
    public identity;
    public status: any;
    @ViewChild('snav') public sidenav: MatSidenav;


    constructor(
        private _UserService: UserService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _SidenavService:SidenavService
    ){
        this.status = null;
        this.title = 'Iniciar sesion ';
        this.user  = new User(0,0,0,'','','ROLE_USER','','','',null);
    }

    ngOnInit(){
        this.logout();
    }

    //iniciando sesion
    onSubmit(form){

        //Invocando datos del usuario desde el servidor
        this._UserService.signup(this.user).subscribe(
            response =>{

                if(response.status!='error'){

                    //Invocando token  del usuario desde el servidor
                    this.token = response;
                    localStorage.setItem('token',this.token);
                    //usuario identificado
                        this._UserService.signup(this.user,true).subscribe(
                            response =>{
                                //guardando el usuario en el almacenamionto local para manteren la secion iniciada
                                this.identity = response;
                                localStorage.setItem('identity',JSON.stringify(this.identity));
                                //estableciendo token e identidad del usuar
                                this._router.navigate(['inicio']);
                            },error =>{
                                console.log(<any>error);
                            }
                        );

                }else{

                    this.status = response.status;

                }

            }, error =>{

                console.log(<any>error);

            }
        );

    }

    //cerrando sesion
    logout(){
        //recogiendo parametros desde URL
        this._route.params.subscribe(params =>{
            let logout = +params['sure'];
            if(logout == 1){
                //eliminando los datos de secion
                localStorage.removeItem('token');
                localStorage.removeItem('identity');
                this.identity = null;
                this.token = null;
                //redireccionando al login
                this._router.navigate(['login']);
            }
        });
    }

}
