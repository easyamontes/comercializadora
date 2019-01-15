import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//componentes
import {OficinasRoutingModule } from './oficinas-routing.module';
import {OficinaMainComponent} from './components/oficina-main.component';
import {OficinaViewComponent} from './components/oficina-view.component';
import {OficinaEditComponent} from './components/oficina-edit.component';
import {OficinaStoreComponent} from './components/oficina-store.component';
//import {OficinaRegisterComponent} from './components/register.component';

//declaracion modulo
@NgModule({
declarations:[
  OficinaMainComponent,
  OficinaViewComponent,
  OficinaEditComponent,
  OficinaStoreComponent//,
//  OficinaRegisterComponent
],
imports:[
   CommonModule,
   FormsModule,
   HttpClientModule,
   OficinasRoutingModule
  ],
  exports:[
    OficinaMainComponent,
    OficinaViewComponent,
    OficinaEditComponent,
    OficinaStoreComponent,
    //OficinasRegisterComponent
  ],
  providers:[]
})

export class OficinasModule{}
