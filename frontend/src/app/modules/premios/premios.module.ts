import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MaterialModule} from '../../module-materilize';

//componentes
import {PremiosRoutingModule} from './premios-routing.module';
 @NgModule({

     declarations:[
         
     ],
     imports:[
        PremiosRoutingModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        MaterialModule

     ],
     exports:[

     ],
     providers:[]
 })
 export class PremiosModule{}