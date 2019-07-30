import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MaterialModule} from '../../module-materilize';
//componentes
import {ArticulosMainComponent} from './components/main.component';
import {ArticulosRoutingModule} from './articulos-routing.module';
import {ArticuloViewComponent} from './components/view.component';
import {ArticuloStoreComponent} from './components/store.component';
import {ArticuloEditComponent} from './components/edit.component';
import { FilterPipe } from './components/pipes/filter.pipe';


//declaracion modulo
@NgModule({
    declarations:[
        ArticulosMainComponent,
        ArticuloViewComponent,
        ArticuloStoreComponent,
        ArticuloEditComponent,
        FilterPipe
    ],
    imports:[
        ArticulosRoutingModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        MaterialModule
      ],
      exports:[
        ArticulosMainComponent,
        ArticuloViewComponent,
        ArticuloStoreComponent,
        ArticuloEditComponent
      ],
      providers:[]
    })
    
    export class ArticulosModule{}