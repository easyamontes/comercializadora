import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//componentes
import {ArticulosMainComponent} from './components/main.component';
import {ArticulosRoutingModule} from './articulos-routing.module';
import {ArticuloViewComponent} from './components/view.component';
import {ArticuloStoreComponent} from './components/store.component';


//declaracion modulo
@NgModule({
    declarations:[
        ArticulosMainComponent,
        ArticuloViewComponent,
        ArticuloStoreComponent
    ],
    imports:[
        ArticulosRoutingModule,
        CommonModule,
        FormsModule,
        HttpClientModule
      ],
      exports:[
        ArticulosMainComponent,
        ArticuloViewComponent,
        ArticuloStoreComponent
      ],
      providers:[]
    })
    
    export class ArticulosModule{}