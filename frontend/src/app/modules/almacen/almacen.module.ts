import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../../module-materilize';
import { AlmacenRoutingModule } from './almacen-routing.module';
//components
import { AlmacenMainComponent } from './components/main.component';

@NgModule({
    declarations: [
        AlmacenMainComponent
    ],
    imports: [
        AlmacenRoutingModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        MaterialModule
    ],
    exports: [
        AlmacenMainComponent
        ],
    providers: []
  })
  
  export class AlmacenModule {}