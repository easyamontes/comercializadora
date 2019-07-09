import { UserService } from 'src/app/services/user.service';
import { GeneralCallService } from 'src/app/services/generalCall.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Ahorro } from 'src/app/models/ahorro';
import { Conceptoahorro} from 'src/app/models/conceptoahorro';

@Component ({
  selector: 'ahorro-desglose,',
  templateUrl: '/ahorro-desglose.component.html',

  providers: [
    UserService,
    GeneralCallService,
  ]
})

export class AhorroDesgloseComponent {
       public token: any;
       public title: string;
       public listaahorro: Array<Ahorro>;
       public conceptoahorro: Array<Conceptoahorro>;

       constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _router: Router
       ){
        this.token = this._UserService.getToken();
       }
}