import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../module-materilize';
import { VentaRoutingModule } from './venta-routing.module';
//components
import { VentaMainComponent } from './components/main.component';
import {PedidoStoreComponent} from './components/pedido/pedido-store.component';
import {PedidoEditComponent} from './components/pedido/pedido-edit.component';



@NgModule({
    declarations: [
        VentaMainComponent,
        PedidoStoreComponent,
        PedidoEditComponent
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
         PedidoEditComponent
        ],
    providers: []
  })
  
  export class VentaModule {}