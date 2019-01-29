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

@NgModule({
    declarations:[
        ProveedoresMainComponent,
        ProveedorViewComponent,
        ProveedorStoreComponent
    ],
    imports:[
        ProveedoresRoutingModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        MaterialModule
      ],
      exports:[],
      providers:[
        ProveedoresMainComponent,
        ProveedorViewComponent,
        ProveedorStoreComponent
      ]
})

export class ProveedoresModule{}