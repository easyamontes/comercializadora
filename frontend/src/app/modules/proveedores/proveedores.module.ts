import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MaterialModule} from '../../module-materilize';
//router
import {ProveedoresRoutingModule} from './proveedores-routing.module';
//componentes
import {ProveedoresMainComponent} from './components/main.component';
import {ProveedorViewComponent} from './components/view.component';
import {ProveedorStoreComponent} from './components/store.component';
import {ProveedorEditComponent} from './components/edit.component';
import { FilterPipe } from './components/pipes/filter.pipe';


@NgModule({
    declarations:[
        ProveedoresMainComponent,
        ProveedorViewComponent,
        ProveedorStoreComponent,
        ProveedorEditComponent,
        FilterPipe
    ],
    imports:[
        ProveedoresRoutingModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        MaterialModule
      ],
      exports:[
        ProveedoresMainComponent,
        ProveedorViewComponent,
        ProveedorStoreComponent,
        ProveedorEditComponent
      ],
      providers:[]
})

export class ProveedoresModule{}