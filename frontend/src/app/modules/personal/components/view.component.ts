import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
//Servicios
import { UserService } from '../../../services/user.service';
import { GeneralCallService } from '../../../services/generalCall.service';
//Utils
import { PersonalUtil } from '../../../services/util/personal.util';
//Modelos
import { Personal } from './../../../models/personal'
//Componentes
import { PersonalRegisterComponent } from './register.component';


@Component({
    selector: 'personal-view',
    templateUrl: './view.component.html',
    providers: [
        UserService,
        GeneralCallService,
        PersonalUtil
    ]
})

export class PersonalViewComponent implements OnInit {
    public title: string;
    public status: string;
    public token: any;
    public personal: Array<Personal>;
    public personaList: Array<Personal>;
    public selectList: Array<any>;
    public displayedColumns: string[] = ['nombre', 'oficina', 'Visualizar', 'editar', 'eliminar', 'usuario'];
    public dataSource: MatTableDataSource<Personal>;
    public organi: Array<any>
    public lider: string;
    public puesto: string;


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private _UserService: UserService,
        private _PersonalUtil: PersonalUtil,
        private _GeneralCallService: GeneralCallService,
        private _MatDialog: MatDialog
    ) {
        this.title = 'Colaborador';
        this.token = this._UserService.getToken();
    }

    ngOnInit() {
        this.getPersonal();
        this.getPuesto();
    }

    /*==============================================================
        FUNCION PARA EL CUADRO DE DIALOGO DE REGISTRO DE USUARIO
    ================================================================ */
    openDialog(data: Personal): void {
        const dialogRef = this._MatDialog.open(PersonalRegisterComponent, {
            data: { persona: data }
        });
        dialogRef.disableClose = true;
        dialogRef.afterClosed().subscribe(result => {
        });
    }


    /*==============================================================
        FUNCION PARA INVOCAR LA LISTA DE PERSONAL
    ================================================================ */
    getPersonal() {
        this._GeneralCallService.getRecords(this.token, 'here').subscribe(
            response => {
                this.personal = this._PersonalUtil.getFamilia(response);
                this.personaList = this._PersonalUtil.getFamilia(response);
                this.lider = response.personal.id;
                this.personal.splice(0, 1);
                this.dataSource = new MatTableDataSource(this.personal);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }, error => {
                console.log(<any>error);
            });
    }


    /*==============================================================
        FUNCION PARA QUE CONTROLA EL FILTRADO LIBRE 
    ================================================================ */
    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    /*==============================================================
        FUNCION PARA ELIMINAR EL REGISTRO DE UN EMPLEADO
    ================================================================ */
    deletePersona(id) {
        if (confirm('Eliminar este registro?')) {
            this._GeneralCallService.delteRcord(this.token, 'personal', id).subscribe(
                response => {
                    this.getPersonal();
                }, error => {
                    console.log(<any>error);
                }
            );
        }
    }

    /*==============================================================
        FUNCION PARA INVOCAR LAS LISTAS DE PUESTOS
    ================================================================ */
    getPuesto() {
        this._GeneralCallService.getRecords(this.token, 'puestos').subscribe(
            response => {
                this.organi = response.puestos;
            }, error => {
                console.log(<any>error);
            }
        );
    }

    /*==============================================================
        FUNCION  QUE CONTROLA EL FILTRADO SEGUN SELECCION EN LOS OTIONS 
    ================================================================ */
    viewFilter() {
        let fileter = {
            lider: this.lider
        }
        this._GeneralCallService.storeRecord(this.token, 'equipo', fileter).subscribe(
            response => {
                let perso = this._PersonalUtil.getFamilia(response);
                perso.splice(0, 1);
                if (this.puesto) {
                    perso = perso.filter(x => x.puesto_id == this.puesto);
                }
                this.dataSource.data = perso;
                this.dataSource._renderChangesSubscription;
            }
        );
    }

}//End Class