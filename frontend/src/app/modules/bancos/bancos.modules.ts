import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MaterialModule} from '../../module-materilize';

//componentes
import {BancosMainComponent} from './components/banco-main.component';
import {BancosViewComponent} from './components/banco-view.component';
import {BancoEditComponent} from './components/banco-edit.component';
import {BancosRoutingModule} from './bancos-routing.module';
//declaracion modulos
@NgModule({
     declarations :[
        BancosMainComponent,
        BancosViewComponent,
        BancoEditComponent
     ],
    imports:[
        CommonModule,
        FormsModule,
        HttpClientModule,
        MaterialModule,
        BancosRoutingModule,

    ],
     exports:[
        BancosMainComponent,
        BancosViewComponent,
        BancoEditComponent
     ],
     providers:[]
})//end Ngmodule

export class BancosModules{}