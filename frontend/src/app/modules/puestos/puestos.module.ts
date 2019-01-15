import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//Componentes
import { PuestosRoutingModule } from './puestos-routing.module';
import { PuestoViewComponent } from './components/puesto-view.component';
import { PuestoEditComponent } from './components/puesto-edit.component';
import { PuestoStoreComponent } from './components/puesto-store.component';
import { PuestoMainComponent } from './components/puesto-main.component';


@NgModule({
    declarations: [
        PuestoViewComponent,
        PuestoEditComponent,
        PuestoStoreComponent,
        PuestoMainComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        PuestosRoutingModule
    ],
    exports: [
        PuestoViewComponent,
        PuestoEditComponent,
        PuestoStoreComponent,
        PuestoMainComponent
        ],
    providers: []
  })
  
  export class PuestosModule {}