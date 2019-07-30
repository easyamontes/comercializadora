import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MaterialModule} from '../../module-materilize';
//Componentes
import { PuestosRoutingModule } from './puestos-routing.module';
import { PuestoViewComponent } from './components/puesto-view.component';
import { PuestoEditComponent } from './components/puesto-edit.component';
import { PuestoStoreComponent } from './components/puesto-store.component';
import { PuestoMainComponent } from './components/puesto-main.component';
import { FilterPipe } from './components/pipes/filter.pipe';



@NgModule({
    declarations: [
        PuestoViewComponent,
        PuestoEditComponent,
        PuestoStoreComponent,
        PuestoMainComponent,
        FilterPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        PuestosRoutingModule,
        MaterialModule
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