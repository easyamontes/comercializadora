import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { GeneralCallService } from '../../../services/generalCall.service';
import { GeneralListService } from '../../../services/generalList.service';
import { Oficina } from 'src/app/models/oficina';
import { Busqueda } from 'src/app/models/busqueda';


@Component({
  selector: 'oficinas',
  templateUrl: './oficina-view.component.html',
  styleUrls: ['./estilo.component.css'],
  providers: [
    UserService,
    GeneralCallService,
    GeneralListService
  ]
})

export class OficinaViewComponent implements OnInit {
  public title: string;
  public status: string;
  public token;
  public oficinas: Array<Oficina>;
  public busqueda: Busqueda;
  public selectList: Array<any>;

  constructor(
    private _UserService: UserService,
    private _GeneralCallService: GeneralCallService,
    private _GeneralListService: GeneralListService,
    private _router: Router
  ) {
    this.title = 'Oficinas';
    this.token = this._UserService.getToken();
    this.busqueda = new Busqueda(null, null, null);
  }

  ngOnInit() {
    this.getOficinas();
    this.gerOptions();
  }
  gerOptions() {
    this._GeneralListService.getListEmpleado(this.token, 'lpersonal').subscribe(
      response => {
        this.selectList = response.personall;
      }
    );
  }
  getOficinas() {
    this._GeneralCallService.getRecords(this.token, 'oficinas').subscribe(
      response => {
        this.oficinas = response.oficinas;
      }, error => {
        console.log(<any>error);
      });
  }

  delteteOficina(id) {
    if (confirm('seguro que desea eliminar esta oficina')) {
      this._GeneralCallService.delteRcord(this.token, 'oficinas', id).subscribe(
        response => {
          this.getOficinas();
        }, error => {
          console.log(<any>error);
        }
      )
    }
  }
}//end class export
