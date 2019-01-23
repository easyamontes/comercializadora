import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MaterialModule} from '../../module-materilize';
//componentes
import {OficinasRoutingModule } from './oficinas-routing.module';
import {OficinaMainComponent} from './components/oficina-main.component';
import {OficinaViewComponent} from './components/oficina-view.component';
import {OficinaEditComponent} from './components/oficina-edit.component';
import {OficinaStoreComponent} from './components/oficina-store.component';

//declaracion modulo
@NgModule({
declarations:[
  OficinaMainComponent,
  OficinaViewComponent,
  OficinaEditComponent,
  OficinaStoreComponent,
],
imports:[
   CommonModule,
   FormsModule,
   HttpClientModule,
   OficinasRoutingModule,
   MaterialModule

  ],
  exports:[
    OficinaMainComponent,
    OficinaViewComponent,
    OficinaEditComponent,
    OficinaStoreComponent,
  ],
  providers:[]
})

export class OficinasModule{}
