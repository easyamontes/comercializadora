import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//componentes
import {ArticulosMainComponent} from './components/main.component';
import {ArticulosRoutingModule} from './articulos-routing.module';


//declaracion modulo
@NgModule({
    declarations:[
        ArticulosMainComponent
    ],
    imports:[
        ArticulosRoutingModule,
        CommonModule,
        FormsModule,
        HttpClientModule
      ],
      exports:[
        ArticulosMainComponent
      ],
      providers:[]
    })
    
    export class ArticulosModule{}