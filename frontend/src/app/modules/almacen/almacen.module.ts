import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../module-materilize';
import { AlmacenRoutingModule } from './almacen-routing.module';
//components
import { AlmacenMainComponent } from './components/main.component';
import { ExistenciaViewComponent } from './components/existencia/listview.component'

@NgModule({
    declarations: [
        AlmacenMainComponent,
        ExistenciaViewComponent
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
        ExistenciaViewComponent
        ],
    providers: []
  })
  
  export class AlmacenModule {}