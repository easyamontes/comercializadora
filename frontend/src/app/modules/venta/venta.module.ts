import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../module-materilize';
import { VentaRoutingModule } from './venta-routing.module';
//components
import { VentaMainComponent } from './components/main.component';
import {PedidoStoreComponent} from './components/pedido/pedido-store.component';
import {PedidoDefaultComponent } from './components/default/default.component';
import {PedidoViewComponent } from './components/pedido/view.component';
import { PedidoEditComponent} from './components/pedido/pedido-edit.component';
import { SocioComponent} from './components/socio_vendedor/socio.component';
import { ReporteDefaultComponent} from './components/reporte/reporte-default.component';
import { ReportePremioComponent} from './components/reporte/reporte-premio.component';
import { ReportePiezaComponent} from './components/reporte/reporte-piezas.component';
import { AhorroViewComponent } from './components/ahorro/ahorro-view.component';
import { AhorroStoreComponent } from './components/ahorro/ahorro-store.component';





@NgModule({
    declarations: [
        VentaMainComponent,
        PedidoStoreComponent,
        PedidoDefaultComponent,
        PedidoViewComponent,
        PedidoEditComponent,
        SocioComponent,
        ReporteDefaultComponent,
        ReportePremioComponent,
        ReportePiezaComponent,
        AhorroViewComponent,
        AhorroStoreComponent
      
    ],
    imports: [
        VentaRoutingModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        MaterialModule
    ],
    exports: [
         VentaMainComponent,
         PedidoStoreComponent,
         PedidoDefaultComponent,
         PedidoViewComponent,
         PedidoEditComponent,
         SocioComponent,
         ReporteDefaultComponent,
         ReportePremioComponent,
         ReportePiezaComponent,
         AhorroViewComponent,
         AhorroStoreComponent
     
        ],
    providers: []
  })
  
  export class VentaModule {}