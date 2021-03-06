import { Component, OnInit, Inject } from '@angular/core';
import { Personal } from './../../../models/personal';
import { User } from './../../../models/user';
import { UserService } from '../../../services/user.service';
import { GeneralCallService } from '../../../services/generalCall.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';

@Component({
    selector: 'personal-register',
    templateUrl: './register.component.html',
    providers:[
        UserService,
        GeneralCallService
    ]
})

export class PersonalRegisterComponent implements OnInit{
    public title:string;
    public status: string;
    public token: any;
    public identity: any;
    public user: User;
    public email: any;
    public persona: Personal;

    constructor(
        private _UserService: UserService,
        private _MatSnackBar: MatSnackBar,
        private _GeneralCallService: GeneralCallService,
        public _MatDialogRef: MatDialogRef<PersonalRegisterComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ){
        this.persona = this.data.persona;
        this.title = 'Editando';
        this.token = _UserService.getToken();
        this.identity = this._UserService.getIdentity();
        this.user = new User(0,this.persona.id,0,'',this.persona.email,'',this.persona.nombre,this.persona.apellidop,'',null);
    }

    ngOnInit(){
        this.getUser();
    }

    closeDialog() {
        this._MatDialogRef.close();
    }

    /**Creando usuario */
    makeUser(){
        this.user.email = this.persona.email;
        this.user.name = this.persona.nombre
        this.user.surname = this.persona.apellidop
        this._UserService.register(this.user).subscribe(
            response =>{
                this._MatSnackBar.open(this.status = response.message,'ok',{
                    duration: 2000
                });
                if(response.code == 200){
                    this.closeDialog();
                }
            },error=>{
                console.log(<any>error);
            });
    }

    getUser(){
        this._GeneralCallService.updateRecord(this.token,'views',1,this.persona.id).subscribe(
            response =>{
                this.user.password = response.user[0].decpassword;
            },error=>{
                console.log(<any>error);
            }
        )

    }
}