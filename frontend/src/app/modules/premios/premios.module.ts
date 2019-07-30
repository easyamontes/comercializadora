import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MaterialModule} from '../../module-materilize';

//componentes
import {PremiosRoutingModule} from './premios-routing.module';
import {PremiosMainComponent} from './components/premio-main.component';
import {PremiosViewComponent} from './components/premio-view.component';
import {PremioEditComponent} from './components/premio-edit.component';
import {PremioStoreComponent} from './components/premio-store.component';
import { FilterPipe } from './components/pipes/filter.pipe';

 @NgModule({

     declarations:[
        PremiosViewComponent,
        PremiosMainComponent,
        PremioStoreComponent,
        PremioEditComponent,
        FilterPipe
         
     ],
     imports:[
        PremiosRoutingModule,
        CommonModule,
        FormsModule,
        HttpClientModule,
        MaterialModule

     ],
     exports:[
        PremiosMainComponent,
        PremiosViewComponent,
        PremioStoreComponent,
        PremioEditComponent

     ],
     providers:[]
 })
 export class PremiosModule{}