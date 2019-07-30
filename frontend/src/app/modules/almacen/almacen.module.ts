import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../module-materilize';
import { AlmacenRoutingModule } from './almacen-routing.module';
//components
import { AlmacenMainComponent } from './components/main.component';
import { ExistenciaViewComponent } from './components/existencia/listview.component';
import { RequisicionViewComponent } from './components/requisiciones/view.component';
import { RequisicionStoreComponent } from './components/requisiciones/store.component'
import { AlmacenDefaultComponent } from './components/default/default.component';
import { RequisicionReciveComponent } from './components/requisiciones/recive.component';
import { DiarioViewComponent } from './components/reporteDiario/view.component';
import { CobranzaViewComponent } from './components/cuentasPC/viewCobrar.component';
import { PagoProveedoresViewComponent } from './components/pagoProveedores/view.component';
import { FilterPipe } from './components/pipes/filter.pipe';
import { ResultadosViewComponent } from './components/cuentasPC/viewResultados.component';



@NgModule({
    declarations: [
        FilterPipe,
        AlmacenMainComponent,
        ExistenciaViewComponent,
        RequisicionViewComponent,
        RequisicionStoreComponent,
        AlmacenDefaultComponent,
        RequisicionReciveComponent,
        DiarioViewComponent,
        CobranzaViewComponent,
        PagoProveedoresViewComponent,
        ResultadosViewComponent
    ],
    imports: [
        AlmacenRoutingModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        MaterialModule
    ],
    exports: [
        AlmacenMainComponent,
        ExistenciaViewComponent,
        RequisicionViewComponent,
        RequisicionStoreComponent,
        AlmacenDefaultComponent,
        RequisicionReciveComponent,
        DiarioViewComponent,
        CobranzaViewComponent,
        PagoProveedoresViewComponent,
        ResultadosViewComponent
        ],
    providers: []
  })
  
  export class AlmacenModule {}