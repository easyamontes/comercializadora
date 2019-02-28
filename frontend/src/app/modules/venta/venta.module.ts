import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../module-materilize';
import { VentaRoutingModule } from './venta-routing.module';
//components
import { VentaMainComponent } from './components/main.component';
import {PedidoStoreComponent} from './components/pedido/pedido-store.component';



@NgModule({
    declarations: [
        VentaMainComponent,
        PedidoStoreComponent
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
         PedidoStoreComponent
        ],
    providers: []
  })
  
  export class VentaModule {}