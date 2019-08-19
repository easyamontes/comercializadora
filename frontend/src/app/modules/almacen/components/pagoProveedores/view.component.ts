import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
//Utils
import { PersonalUtil } from '../../../../services/util/personal.util';
//Servicios
import { UserService } from '../../../../services/user.service';
import { GeneralCallService } from '../../../../services/generalCall.service';
//Modelos
import { PagoProveedor } from 'src/app/models/pagoproveedor';
import { Busqueda } from 'src/app/models/busqueda';


@Component({
    selector: 'ppago-view',
    templateUrl: './view.component.html',
    providers: [
        UserService,
        GeneralCallService
    ]
})

export class PagoProveedoresViewComponent implements OnInit {
    @ViewChild('closeBtn') closeBtn: ElementRef;
    public token: any;
    public factura: PagoProveedor;
    public facturas: Array<any>;
    public proove: Array<any>;
    public title: string;
    public busqueda: Busqueda;
    public ind: number;
    public tipo: string;

    constructor(
        private _UserService: UserService,
        private _GeneralCallService: GeneralCallService,
        private _PersonalUtil: PersonalUtil,
    ) {
        this.title = 'Pago de Servicos';
        this.tipo = 'SIN PAGAR';
        this.ind = null;
        this.token = this._UserService.getToken();
        this.factura = new PagoProveedor(null, null, null, null, null, null, null, null, null, null);
        this.busqueda = new Busqueda(null, null, null);
    }

    ngOnInit() {
        this.getFacturasSinPagar();
    }

    /*==============================================================
            FUNCION PARA CERRAR EL MODAL DE EDICION
    ================================================================ */
    private closeModal(): void {
        this.closeBtn.nativeElement.click();
    }

    /*==============================================================
            FUNCION PARA GESTIONAR EL CAMBIO DE REPORTE
    ================================================================ */
    onOptionSwitch(value: string) {
        if (value === 'SIN PAGAR') {
            this.getFacturasSinPagar();
        } else {
            this.getFacturasPagadas();
        }
    }

    /*==============================================================
            FUNCION PARA INVOCAR LA LISTA DE FACTURAS NO PAGADAS
    ================================================================ */
    getFacturasSinPagar() {
        this._GeneralCallService.getRecords(this.token, 'pagopro').subscribe(
            response => {
                this.facturas = response.facturas;
            }, error => {
                console.log(<any>error);
            }
        );
    }

    /*==============================================================
            FUNCION PARA INVOCAR LA LISTA DE FACTURAS PAGADAS
    ================================================================ */
    getFacturasPagadas() {
        this._GeneralCallService.getRecords(this.token, 'ppagados').subscribe(
            response => {
                this.facturas = response.facturas;
            }, error => {
                console.log(<any>error);
            }
        );
    }

    /*==============================================================
            FUNCION PARA CONTAR EL TOTAL DE LOS CONCEPTOS
    ================================================================ */
    getProveedores() {
        this._GeneralCallService.getRecords(this.token, 'proveedores').subscribe(
            response => {
                this.proove = response.proveedores
            }, error => {
                console.log(<any>error);
            });
    }

    /*==============================================================
            DAR POR PAGADA LA REQUISICION
    ================================================================ */
    setPagado(item: any, i: any) {
        this.ind = i;
        this._GeneralCallService.updateRecord(this.token, 'pagopro', item, item.id).subscribe(
            response => {
                if (response.code == 200) {
                    this.ind = null;
                    this.getFacturasSinPagar();
                }
            }, error => {
                this.ind = null;
                console.log(<any>error);
            }
        )
    }

    /*==============================================================
            FUNCION PARA CONTAR EL TOTAL DE LOS CONCEPTOS
    ================================================================ */
    getTotal() {
        return this.facturas.map(c => c.total).reduce((ant, act) => +ant + +act, 0);
    }

    /*==============================================================
            FUNCION PARA GUARDAR EL PAGO
    ================================================================ */
    onSubmit() {
        this.closeModal();
        this.factura.total = +this.factura.importe + +this.factura.iva;
        this._GeneralCallService.storeRecord(this.token, 'pagopro', this.factura).subscribe(
            response => {
                let nitem = response.factura;
                let cleator = new PagoProveedor(null, null, null, null, null, null, null, null, null, null);
                this.facturas.push(nitem);
                this.factura = cleator;
            }, error => {
                console.log(<any>error);
            }
        )
    }


    /*==============================================================
            FUNCION PARA CANCELAR LA EDICION DE DATOS 
    ================================================================ */
    onCancel() {
        let cleator = new PagoProveedor(null, null, null, null, null, null, null, null, null, null);
        this.factura = cleator;
        this.closeModal();
    }

    /*==============================================================
            FUNCION PARA ELIMINAR LA FACTURA
    ================================================================ */
    onDestroy(id: number, index: number) {
        if (confirm('Eliminar esta factura?')) {
            this._GeneralCallService.delteRcord(this.token, 'pagopro', id).subscribe(
                response => {
                    this.facturas.splice(index, 1);
                }, error => {
                    console.log(<any>error);
                }
            );
        }
    }

}//End Class
